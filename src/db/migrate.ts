import { createClient } from '@libsql/client';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function migrate() {
  console.log('Starting migration...');

  try {
    // 1. Users Table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        wallet_balance_ghs REAL DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Bottles Table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS bottles (
        id TEXT PRIMARY KEY,
        owner_id TEXT NOT NULL,
        type TEXT NOT NULL,
        size_litres INTEGER NOT NULL,
        refill_count INTEGER DEFAULT 0,
        liner_state TEXT NOT NULL,
        last_scanned_at DATETIME,
        FOREIGN KEY (owner_id) REFERENCES users(id)
      )
    `);

    // 3. Transactions Table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS wallet_transactions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        type TEXT NOT NULL,
        amount_ghs REAL NOT NULL,
        reference TEXT NOT NULL,
        date DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // 4. Orders Table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        status TEXT NOT NULL,
        total_amount_ghs REAL NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        driver_name TEXT,
        driver_phone TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    console.log('Tables created successfully.');

    // Seed Data
    // Check if user exists
    const userRes = await db.execute("SELECT id FROM users WHERE id = 'USR-9921'");
    if (userRes.rows.length === 0) {
      console.log('Seeding initial user and data...');
      
      await db.execute(`
        INSERT INTO users (id, name, phone, wallet_balance_ghs) 
        VALUES ('USR-9921', 'Kojo', '+233 54 123 4567', 150.00)
      `);

      // Initial Bottles
      await db.execute(`
        INSERT INTO bottles (id, owner_id, type, size_litres, refill_count, liner_state) VALUES
        ('NS-BTL-88219-A', 'USR-9921', 'Smart Dispenser Shell', 15, 14, 'empty_ready_return'),
        ('NS-BTL-88219-B', 'USR-9921', 'Smart Dispenser Shell', 15, 14, 'active_use'),
        ('NS-BTL-99432-C', 'USR-9921', 'Smart Dispenser Shell', 15, 3, 'active_use')
      `);

      console.log('Seed complete.');
    } else {
      console.log('Data already seeded.');
    }

  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    db.close();
  }
}

migrate();
