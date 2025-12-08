// apps/backend/scripts/dbViews.js

import { createClient } from '@vercel/postgres';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: './.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log('\n=====================================');
  console.log('🪟 START CREATE VIEWS (PostgreSQL)');
  console.log('=====================================\n');

  try {
    const client = createClient();
    await client.connect();

    const viewsPath = path.resolve(__dirname, '../src/db/views.sql');
    const viewsSql = fs.readFileSync(viewsPath, 'utf8');

    await client.query(viewsSql);

    await client.end();

    console.log('\n-------------------------------------');
    console.log('✅ CREATE VIEWS DONE');
    console.log('-------------------------------------\n');
  } catch (err) {
    console.error('\n❌ CREATE VIEWS ERROR');
    console.error(err);
    process.exit(1);
  }
}

main();
