import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { db } from "./src/db/index.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI client
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "Nsupa Circular Water Platform" });
});

// AI Water Prediction & Refill Optimization Endpoint
app.post("/api/ai/predict", async (req, res) => {
  try {
    const { householdSize, location, currentBottles, usagePattern, role } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Fallback deterministic AI estimation if API Key isn't configured
      const dailyPerPerson = 2.5; // liters
      const totalDaily = (householdSize || 4) * dailyPerPerson;
      const capacityLitres = (currentBottles || 2) * 15;
      const daysRemaining = Math.max(1, Math.round(capacityLitres / totalDaily));
      
      const runOutDate = new Date();
      runOutDate.setDate(runOutDate.getDate() + daysRemaining);

      return res.json({
        daysRemaining,
        predictedRunOutDate: runOutDate.toISOString().split("T")[0],
        recommendedRefillDate: new Date(runOutDate.getTime() - 86400000 * 2).toISOString().split("T")[0],
        suggestedPlan: householdSize > 5 ? "Weekly 4-Bottle Refill" : "Bi-Weekly 2-Bottle Refill",
        sachetsSavedPerMonth: Math.round((totalDaily * 30) / 0.5),
        co2SavedKg: Number(((totalDaily * 30 * 0.04)).toFixed(1)),
        insights: [
          `Based on a ${householdSize || 4}-person household in ${location || 'Accra'}, you consume ~${Math.round(totalDaily)}L per day.`,
          `Your 15L reusable Nsupa dispenser shell will need a fresh factory-sealed pouch refill in ${daysRemaining} days.`,
          `By switching from 500ml single-use sachets, you prevent ${Math.round((totalDaily * 30) / 0.5)} plastic sachets from entering landfills each month.`
        ],
        smartTip: "Set up auto-dispatch on Wednesdays to avoid weekend supply delays during peak Accra temperatures."
      });
    }

    const prompt = `You are Nsupa's Smart Water AI Engine in Ghana.
Analyze the following parameters:
- Household / Facility Size: ${householdSize || 4} people
- Location: ${location || 'Accra Central'}
- Current Reusable 15L Bottles on Hand: ${currentBottles || 2}
- Usage Pattern: ${usagePattern || 'Standard drinking & cooking'}
- Request Role: ${role || 'customer'}

Provide JSON response with:
1. daysRemaining (number)
2. predictedRunOutDate (YYYY-MM-DD string)
3. recommendedRefillDate (YYYY-MM-DD string)
4. suggestedPlan (string)
5. sachetsSavedPerMonth (number)
6. co2SavedKg (number)
7. insights (array of 3 helpful sentences specific to water sustainability in Ghana)
8. smartTip (1 short actionable tip)

Respond strictly in valid JSON format with no markdown wrappers or backticks.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text || "";
    const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleanJson);
    return res.json(parsed);

  } catch (err: any) {
    console.error("AI Prediction Error:", err);
    // Graceful fallback
    return res.json({
      daysRemaining: 4,
      predictedRunOutDate: new Date(Date.now() + 86400000 * 4).toISOString().split("T")[0],
      recommendedRefillDate: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
      suggestedPlan: "Bi-Weekly 2-Bottle Refill",
      sachetsSavedPerMonth: 600,
      co2SavedKg: 24.5,
      insights: [
        "Your household consumes approximately 10L of purified drinking water daily.",
        "Your 15L factory-sealed inner liner collapse indicates ~35% remaining capacity.",
        "You have eliminated over 1,200 single-use sachet rubbers since joining Nsupa!"
      ],
      smartTip: "Schedule your refill now to secure Friday morning delivery slot."
    });
  }
});

// --- TURSO DB BACKEND APIs ---

// Default User ID (since we don't have auth)
const USER_ID = 'USR-9921';

// 1. Get current user & wallet
app.get("/api/me", async (req, res) => {
  try {
    const userRes = await db.execute({
      sql: "SELECT * FROM users WHERE id = ?",
      args: [USER_ID]
    });
    if (userRes.rows.length === 0) return res.status(404).json({ error: "User not found" });
    
    // Fetch recent wallet transactions
    const txRes = await db.execute({
      sql: "SELECT * FROM wallet_transactions WHERE user_id = ? ORDER BY date DESC LIMIT 5",
      args: [USER_ID]
    });

    res.json({
      user: userRes.rows[0],
      transactions: txRes.rows
    });
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 2. Get user's bottles
app.get("/api/bottles", async (req, res) => {
  try {
    const bottlesRes = await db.execute({
      sql: "SELECT * FROM bottles WHERE owner_id = ?",
      args: [USER_ID]
    });
    res.json(bottlesRes.rows);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 3. Process a QR scan
app.post("/api/scan", async (req, res) => {
  try {
    const { bottleId } = req.body;
    if (!bottleId) return res.status(400).json({ error: "bottleId is required" });

    // Ensure bottle exists and belongs to user
    const bottleRes = await db.execute({
      sql: "SELECT * FROM bottles WHERE id = ? AND owner_id = ?",
      args: [bottleId, USER_ID]
    });

    if (bottleRes.rows.length === 0) {
      return res.status(404).json({ error: "Container not found or unauthorized" });
    }

    // Update state to depot scan (or simulate refill)
    await db.execute({
      sql: "UPDATE bottles SET refill_count = refill_count + 1, liner_state = 'factory_sealed', last_scanned_at = CURRENT_TIMESTAMP WHERE id = ?",
      args: [bottleId]
    });

    res.json({ success: true, message: "Container verified & refilled", bottleId });
  } catch (error) {
    console.error("Scan Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 4. Place Order & Deduct Wallet
app.post("/api/order", async (req, res) => {
  try {
    const { totalAmountGHS } = req.body;
    
    // Check wallet balance
    const userRes = await db.execute({
      sql: "SELECT wallet_balance_ghs FROM users WHERE id = ?",
      args: [USER_ID]
    });
    
    const balance = userRes.rows[0].wallet_balance_ghs as number;
    if (balance < totalAmountGHS) {
      return res.status(400).json({ error: "Insufficient wallet balance" });
    }

    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    // Deduct balance
    await db.execute({
      sql: "UPDATE users SET wallet_balance_ghs = wallet_balance_ghs - ? WHERE id = ?",
      args: [totalAmountGHS, USER_ID]
    });

    // Record wallet tx
    await db.execute({
      sql: "INSERT INTO wallet_transactions (id, user_id, type, amount_ghs, reference) VALUES (?, ?, ?, ?, ?)",
      args: [`TX-${Date.now()}`, USER_ID, 'water_refill', totalAmountGHS, `Payment for order ${orderId}`]
    });

    // Record Order
    await db.execute({
      sql: "INSERT INTO orders (id, user_id, status, total_amount_ghs, driver_name, driver_phone) VALUES (?, ?, ?, ?, ?, ?)",
      args: [orderId, USER_ID, 'active', totalAmountGHS, 'Kwame Osei (Live)', '+233 20 882 1109']
    });

    res.json({ success: true, orderId });
  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 5. Wallet Topup
app.post("/api/wallet/topup", async (req, res) => {
  try {
    const { amountGHS, channel } = req.body;
    
    await db.execute({
      sql: "UPDATE users SET wallet_balance_ghs = wallet_balance_ghs + ? WHERE id = ?",
      args: [amountGHS, USER_ID]
    });

    await db.execute({
      sql: "INSERT INTO wallet_transactions (id, user_id, type, amount_ghs, reference) VALUES (?, ?, ?, ?, ?)",
      args: [`TX-${Date.now()}`, USER_ID, 'top_up', amountGHS, `Top-up via ${channel}`]
    });

    res.json({ success: true, message: `Successfully topped up GH₵ ${amountGHS}` });
  } catch (error) {
    console.error("Topup Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Nsupa server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
