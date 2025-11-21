// scripts/build-all.ts

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

function logTitle(title: string) {
  console.log(`\n🛠️  ${title.toUpperCase()}`);
  console.log('='.repeat(title.length + 6));
}

function logCommand(cmd: string, cwd?: string) {
  console.log(`> 📂 CWD : ${path.resolve(cwd ?? process.cwd())}`);
  console.log(`> 💻 CMD : ${cmd}`);
}

function runSync(cmd: string, cwd?: string) {
  logCommand(cmd, cwd);
  execSync(cmd, { stdio: 'inherit', cwd });
}

function checkOutDirExists(): boolean {
  const outDir = path.resolve('plugins/mx-core-docs/out');
  const exists = fs.existsSync(outDir) && fs.readdirSync(outDir).length > 0;
  console.log(`\n🔍 MENGECEK FOLDER OUT: ${outDir}`);
  if (!exists) {
    console.error(`❌ Folder out/ TIDAK ADA atau KOSONG.`);
  } else {
    console.log(`✅ Folder out/ TERDETEKSI dan TIDAK KOSONG.`);
  }
  return exists;
}

function failAndExit(reason: string) {
  console.error(`\n❌ BUILD DIHENTIKAN: ${reason}`);
  process.exit(1);
}

async function main() {
  // STEP 1: Clean & Build Plugin UI
  logTitle('Clean & Build Plugin UI (mx-core-docs)');
  runSync(
    'powershell -Command "if (Test-Path .next) { Remove-Item -Recurse -Force .next }; if (Test-Path out) { Remove-Item -Recurse -Force out }"',
    'plugins/mx-core-docs'
  );

  runSync('npm run build', 'plugins/mx-core-docs'); // hanya build

  if (!checkOutDirExists()) {
    failAndExit('next build tidak menghasilkan folder /out');
  }

  // STEP 2: Tambahkan .nojekyll
  logTitle('Tambahkan .nojekyll jika out/ ada isinya');
  runSync(
    "powershell -Command \"if ((Test-Path 'out') -and (Get-ChildItem 'out' | Measure-Object).Count -gt 0) { New-Item -Path 'out/.nojekyll' -ItemType File -Force }\"",
    'plugins/mx-core-docs'
  );

  // STEP 3: Generate plugin-manifest.json
  logTitle('Generate plugin-manifest.json');
  runSync('npx ts-node scripts/generate-plugin-manifest.ts');

  // STEP 4: Pindahkan hasil export plugin
  logTitle('Pindahkan hasil export plugin');
  runSync('node scripts/post-export-move.js');

  console.log('\n✅ Build selesai. Jalankan: npx serve apps/frontend/out');
}

main().catch((err) => {
  console.error(`\n❌ ERROR FATAL: ${err.message}`);
  process.exit(1);
});
