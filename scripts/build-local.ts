// scripts/build-local.ts

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

function logTitle(title: string) {
  console.log(`\n🧱 [LOCAL BUILD] ${title.toUpperCase()}`);
  console.log('='.repeat(title.length + 20));
}

function logCommand(cmd: string, cwd?: string) {
  console.log(`> 📂 CWD : ${path.resolve(cwd ?? process.cwd())}`);
  console.log(`> 💻 CMD : ${cmd}`);
}

function runSync(cmd: string, cwd?: string) {
  logCommand(cmd, cwd);
  execSync(cmd, {
    stdio: 'inherit',
    cwd,
    shell: process.platform === 'win32' ? 'cmd.exe' : '/bin/sh',
  });
}

function cleanDirs() {
  const pluginOut = path.resolve('plugins/mx-core-docs/out');
  const pluginNext = path.resolve('plugins/mx-core-docs/.next');
  const frontendOut = path.resolve('apps/frontend/out');

  for (const dir of [pluginOut, pluginNext, frontendOut]) {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
      console.log(`🧹 Folder ${dir} dihapus`);
    }
  }
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
  logTitle('Build Lokal Dimulai');

  // STEP 1: Clean
  logTitle('Clean Direktori Output');
  cleanDirs();

  // STEP 2: Build Plugin
  logTitle('Build Plugin UI');
  runSync('cross-env GITHUB_PAGES=false npm run build', 'plugins/mx-core-docs');

  if (!checkOutDirExists()) {
    failAndExit('next build tidak menghasilkan folder /out');
  }

  // STEP 3: .nojekyll
  logTitle('Tambahkan .nojekyll');
  const nojekyllPath = path.resolve('plugins/mx-core-docs/out/.nojekyll');
  fs.writeFileSync(nojekyllPath, '');
  console.log(`📄 File .nojekyll ditambahkan ke: ${nojekyllPath}`);

  // STEP 4: Generate manifest
  logTitle('Generate plugin-manifest.json');
  runSync('npx ts-node scripts/generate-plugin-manifest.ts');

  // STEP 5: Pindahkan hasil plugin ke frontend/out
  logTitle('Pindahkan hasil export plugin');
  runSync('node scripts/post-export-move.js');

  // STEP 6: Build & Export Frontend
  logTitle('Build & Export Frontend');
  runSync('npm run build:frontend');
  runSync('npm run export:frontend');

  console.log(
    '\n✅ Build lokal selesai. Jalankan: npx serve apps/frontend/out'
  );
}

main().catch((err) => {
  console.error(`\n❌ ERROR FATAL: ${err.message}`);
  process.exit(1);
});
