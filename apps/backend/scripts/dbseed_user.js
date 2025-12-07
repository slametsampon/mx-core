// apps/backend/scripts/dbseed_user.js

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import crypto from 'node:crypto';
import { sql } from '@vercel/postgres';

// ---------------------------------------------------------
// Setup __dirname & load env
// ---------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// ---------------------------------------------------------
function loadJson(seedDir, baseName) {
  const filePath = path.join(seedDir, `${baseName}.json`);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  Skip user: file not found (${baseName}.json)`);
    return null;
  }

  const raw = fs.readFileSync(filePath, 'utf-8').trim();
  if (!raw) {
    console.warn(`⚠️  Skip user: file empty (${baseName}.json)`);
    return null;
  }

  try {
    const data = JSON.parse(raw);
    if (!Array.isArray(data) || data.length === 0) {
      console.warn(`⚠️  Skip user: JSON empty (${baseName}.json)`);
      return null;
    }
    return data;
  } catch (err) {
    console.error(`❌ JSON parse error: ${baseName}.json`);
    throw err;
  }
}

// ---------------------------------------------------------
async function seedUser(rows) {
  console.log(`📌 Seeding "user" (${rows.length} rows)...\n`);

  for (const row of rows) {
    const id = row.id ?? crypto.randomUUID();
    const username = row.username;
    const role = row.role;
    const avatar_url = row.avatar_url ?? row.avatarUrl ?? null;

    const plainPassword = row.password;
    if (!plainPassword || plainPassword.length < 3) {
      console.log(`⚠️  Skip user "${username}" → invalid password`);
      continue;
    }

    const password_hash = crypto
      .createHash('sha256')
      .update(plainPassword)
      .digest('hex');

    await sql`
      INSERT INTO "user" (
        id,
        username,
        password_hash,
        role,
        avatar_url,
        created_at,
        updated_at
      )
      VALUES (
        ${id},
        ${username},
        ${password_hash},
        ${role},
        ${avatar_url},
        ${new Date().toISOString()},
        ${new Date().toISOString()}
      )
      ON CONFLICT (id) DO NOTHING
    `;

    console.log(
      `   ✔ user "${username}" inserted → hash="${password_hash.slice(
        0,
        12
      )}..."`
    );
  }

  console.log(`\n✅ Done seeding user (${rows.length})\n`);
}

// ---------------------------------------------------------
async function main() {
  console.log('\n=====================================');
  console.log('🚀  START DB SEED USER');
  console.log('=====================================\n');

  try {
    const seedDir = process.env.SEED_PATH || path.resolve(__dirname, '../data');

    console.log(`📂 Seed-path : ${seedDir}\n`);

    const rows = loadJson(seedDir, 'user');
    if (!rows) {
      console.warn('⚠️  No user to seed.');
      return;
    }

    await seedUser(rows);

    console.log('-------------------------------------');
    console.log('✨ USER SEED DONE');
    console.log('-------------------------------------\n');
  } catch (err) {
    console.error('❌ USER SEED ERROR');
    console.error(err);
    process.exit(1);
  }
}

main();
