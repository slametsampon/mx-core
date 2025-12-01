// scripts/build-gh-pages.ts

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

function logTitle(title: string) {
  console.log(`\n🌍 [GITHUB PAGES] ${title.toUpperCase()}`);
  console.log('='.repeat(title.length + 20));
}

function runSync(cmd: string, cwd?: string) {
  console.log(`> 💻 ${cmd}`);
  execSync(cmd, {
    stdio: 'inherit',
    cwd,
    shell: process.platform === 'win32' ? 'cmd.exe' : '/bin/sh',
  });
}

function cleanOutDir() {
  const pluginOut = path.resolve('plugins/mx-core-docs/out');
  const pluginNext = path.resolve('plugins/mx-core-docs/.next');

  for (const dir of [pluginOut, pluginNext]) {
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
  console.error(`\n❌ DEPLOY GAGAL: ${reason}`);
  process.exit(1);
}

async function main() {
  logTitle('Build untuk GitHub Pages Dimulai');

  cleanOutDir();

  // Step 1: Build semua dependency plugin
  logTitle('Build Dependencies');
  runSync('npm run build -w @mx-core/types');
  runSync('npm run build -w @mx-core/core');
  runSync('npm run build -w @mx-core/ui');
  runSync('npm run build -w @mx-core/metric');

  // Step 2: Build plugin target
  logTitle('Build Plugin mx-core-docs');
  runSync('npm run build', 'plugins/mx-core-docs');

  if (!checkOutDirExists()) {
    failAndExit('next build tidak menghasilkan folder /out');
  }

  // Step 3: Add .nojekyll
  logTitle('Tambahkan .nojekyll');
  fs.writeFileSync(path.resolve('plugins/mx-core-docs/out/.nojekyll'), '');

  // Step 4: Generate manifest
  logTitle('Generate plugin-manifest.json');
  runSync('npx tsx scripts/generate-plugin-manifest.ts');

  // Step 5: Copy hasil ke frontend
  logTitle('Salin hasil plugin ke frontend');
  runSync('node scripts/post-export-move.js');

  console.log('\n✅ Build untuk GitHub Pages selesai. Siap deploy');
}

main().catch((err) => {
  console.error(`\n❌ ERROR FATAL: ${err.message}`);
  process.exit(1);
});
