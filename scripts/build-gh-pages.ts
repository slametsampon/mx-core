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

  // STEP 1: Build plugin
  logTitle('Build Plugin mx-core-docs');
  runSync('npm run build', 'plugins/mx-core-docs');
  // runSync('npm run build:gh-pages', 'plugins/mx-core-docs');

  if (!checkOutDirExists()) {
    failAndExit('next build tidak menghasilkan folder /out');
  }

  // STEP 2: .nojekyll
  logTitle('Tambahkan .nojekyll');
  const nojekyllPath = path.resolve('plugins/mx-core-docs/out/.nojekyll');
  fs.writeFileSync(nojekyllPath, '');
  console.log(`📄 .nojekyll ditambahkan ke: ${nojekyllPath}`);

  // STEP 3: Generate plugin-manifest.json
  logTitle('Generate plugin-manifest.json');
  runSync('npx tsx scripts/generate-plugin-manifest.ts');

  // STEP 4: Salin hasil ke frontend/out/frontend/docs
  logTitle('Salin hasil plugin ke frontend');
  runSync('node scripts/post-export-move.js');

  console.log('\n✅ Build untuk GitHub Pages selesai. Siap deploy');
}

main().catch((err) => {
  console.error(`\n❌ ERROR FATAL: ${err.message}`);
  process.exit(1);
});
