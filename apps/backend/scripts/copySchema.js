// apps/backend/scripts/copySchema.js

const fs = require('fs');
const path = require('path');

const source = path.resolve(__dirname, '../src/db/schema.sql');
const target = path.resolve(__dirname, '../dist/db/schema.sql');

// Pastikan folder tujuan ada
fs.mkdirSync(path.dirname(target), { recursive: true });

// Salin file
fs.copyFileSync(source, target);

console.log('✅ schema.sql copied to dist/db/schema.sql');
