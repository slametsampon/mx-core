// apps/backend/src/db/initSchema.ts

import { createClient } from '@vercel/postgres';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function initSchema() {
  const client = createClient();

  await client.connect();

  const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

  console.log('\n[DB] Running schema migration...');

  await client.query(schemaSql);

  console.log('[DB] Schema initialized successfully.');

  await client.end();
}
