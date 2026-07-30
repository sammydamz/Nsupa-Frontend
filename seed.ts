/**
 * Nsupa GH — Database Seed Script
 * Run: npx tsx seed.ts
 * Or on Railway: railway run npx tsx seed.ts
 */

async function seed() {
  console.log("🌱 Seeding Nsupa database...\n");

  const { createClient } = await import("@libsql/client");
  const db = createClient({
    url: process.env.TURSO_DATABASE_URL || "libsql://nsupa-db-futureaigh.aws-eu-west-1.turso.io",
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  console.log("📦 Connected to Turso DB\n");

  // --- Drop existing tables ---
  await db.execute("DROP TABLE IF EXISTS orders");
  await db.execute("DROP TABLE IF EXISTS wallet_transactions");
  await db.execute("DROP TABLE IF EXISTS bottles");
  await db.execute("DROP TABLE IF EXISTS users");
  console.log("✅ Old tables dropped\n");

  // --- Create tables ---
  console.log("Creating tables...");

  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT,
      address TEXT,
      wallet_balance_ghs REAL DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS bottles (
      id TEXT PRIMARY KEY,
      qr_code TEXT NOT NULL,
      type TEXT NOT NULL,
      size_litres INTEGER DEFAULT 15,
      owner_id TEXT,
      status TEXT DEFAULT 'with_customer',
      liner_state TEXT DEFAULT 'partially_used',
      tamper_evident_ring_intact INTEGER DEFAULT 1,
      deposit_amount_ghs REAL DEFAULT 25,
      assigned_customer TEXT,
      assigned_driver TEXT,
      refill_count INTEGER DEFAULT 0,
      last_refilled_at TEXT,
      depot_location TEXT DEFAULT 'Achimota Certified Depot #1',
      batch_number TEXT,
      last_scanned_at TEXT,
      FOREIGN KEY (owner_id) REFERENCES users(id)
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS wallet_transactions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      type TEXT NOT NULL,
      amount_ghs REAL NOT NULL,
      description TEXT,
      reference TEXT,
      date TEXT DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT 'completed',
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      total_amount_ghs REAL,
      driver_name TEXT,
      driver_phone TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  console.log("✅ Tables created\n");

  // --- Seed user ---
  console.log("Seeding user...");
  await db.execute({
    sql: "INSERT OR IGNORE INTO users (id, name, phone, address, wallet_balance_ghs) VALUES (?, ?, ?, ?, ?)",
    args: ["USR-9921", "Ama Mensah", "+233 24 412 3456", "House 14, Boundary Road, East Legon, Accra", 125.00],
  });
  console.log("✅ User seeded\n");

  // --- Seed bottles ---
  console.log("Seeding bottles...");
  const bottles = [
    { id: "NS-BTL-8821", qr_code: "Nsupa-15L-8821-ACCR", type: "15L Reusable Dispenser Bottle", size_litres: 15, liner_state: "partially_used", refill_count: 14, deposit: 25, batch: "BATCH-2026-0718-A", customer: "Ama Mensah" },
    { id: "NS-BTL-8822", qr_code: "Nsupa-15L-8822-ACCR", type: "15L Reusable Dispenser Bottle", size_litres: 15, liner_state: "empty_ready_return", refill_count: 22, deposit: 25, batch: "BATCH-2026-0702-B", customer: "Ama Mensah" },
    { id: "NS-BTL-9003", qr_code: "Nsupa-15L-9003-ACCR", type: "15L Reusable Dispenser Bottle", size_litres: 15, liner_state: "freshly_filled", refill_count: 8, deposit: 25, batch: "BATCH-2026-0721-C", customer: "Kofi Asante", driver: "Kwame Osei (Rider #12)" },
    { id: "NS-BTL-4110", qr_code: "Nsupa-5L-4110-KMS", type: "5L Eco Pouch", size_litres: 5, liner_state: "empty_ready_return", refill_count: 31, deposit: 10, batch: "BATCH-2026-0710-A" },
    { id: "NS-BTL-3321", qr_code: "Nsupa-15L-3321-ACCR", type: "15L Reusable Dispenser Bottle", size_litres: 15, liner_state: "empty_ready_return", refill_count: 6, deposit: 25, batch: "BATCH-2026-0719-A" },
    { id: "NS-BTL-4433", qr_code: "Nsupa-15L-4433-ACCR", type: "15L Reusable Dispenser Bottle", size_litres: 15, liner_state: "empty_ready_return", refill_count: 42, deposit: 25, batch: "BATCH-2026-0721-D" },
    { id: "NS-BTL-5541", qr_code: "Nsupa-15L-5541-ACCR", type: "15L Reusable Dispenser Bottle", size_litres: 15, liner_state: "freshly_filled", refill_count: 9, deposit: 25, batch: "BATCH-2026-0722-A", customer: "St. Mary's School", driver: "Kwame Osei (Rider #12)" },
    { id: "NS-BTL-5542", qr_code: "Nsupa-15L-5542-ACCR", type: "15L Reusable Dispenser Bottle", size_litres: 15, liner_state: "freshly_filled", refill_count: 5, deposit: 25, batch: "BATCH-2026-0722-A", customer: "St. Mary's School", driver: "Kwame Osei (Rider #12)" },
  ];

  for (const b of bottles) {
    const status = b.liner_state === "freshly_filled" ? "ready_for_dispatch" : b.liner_state === "empty_ready_return" ? "at_depot_cleaning" : "with_customer";
    await db.execute({
      sql: "INSERT OR IGNORE INTO bottles (id, qr_code, type, size_litres, owner_id, status, liner_state, tamper_evident_ring_intact, deposit_amount_ghs, assigned_customer, assigned_driver, refill_count, depot_location, batch_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      args: [b.id, b.qr_code, b.type, b.size_litres, "USR-9921", status, b.liner_state, 1, b.deposit, b.customer || null, b.driver || null, b.refill_count, "Achimota Certified Depot #1", b.batch],
    });
  }
  console.log(`✅ ${bottles.length} bottles seeded\n`);

  // --- Seed wallet transactions ---
  console.log("Seeding transactions...");
  const txs = [
    { id: "TXN-901", type: "deposit_refund", amount: 30.00, ref: "REF-DEP-881920", desc: "Container Deposit Refund (2x Empty 15L Returned)" },
    { id: "TXN-902", type: "water_purchase", amount: 30.00, ref: "PAY-PS-991204", desc: "Payment for 2x 15L Water Refill (Order #NS-94821)" },
    { id: "TXN-903", type: "top_up", amount: 100.00, ref: "TOPUP-ML-00381", desc: "Nsupa Wallet Top-Up via Moolre" },
  ];
  for (const t of txs) {
    await db.execute({
      sql: "INSERT OR IGNORE INTO wallet_transactions (id, user_id, type, amount_ghs, reference, description) VALUES (?, ?, ?, ?, ?, ?)",
      args: [t.id, "USR-9921", t.type, t.amount, t.ref, t.desc],
    });
  }
  console.log(`✅ ${txs.length} transactions seeded\n`);

  console.log("🎉 Database seeded successfully!");
  process.exit(0);
}

seed().catch((e) => {
  console.error("❌ Seed failed:", e);
  process.exit(1);
});
