// scripts/post-export-move.js

const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');

const OUT_DIR = path.resolve(__dirname, '../apps/frontend/out');
const TARGET_DIR = path.join(OUT_DIR, 'frontend');

const manifestSrc = path.resolve(
  __dirname,
  '../apps/frontend/public/plugin-manifest.json'
);
const manifestDst = path.join(TARGET_DIR, 'plugin-manifest.json');

const pluginDocsOut = path.resolve(__dirname, '../plugins/mx-core-docs/out');
const targetDocsDir = path.join(TARGET_DIR, 'docs');

async function moveExportedFiles() {
  console.log('🔍 Checking export output paths...');
  console.log('📁 OUT_DIR:', OUT_DIR);
  console.log('📁 TARGET_DIR:', TARGET_DIR);
  console.log('📁 Plugin UI out:', pluginDocsOut);
  console.log('📁 Target docs dir:', targetDocsDir);
  console.log('📄 Manifest source:', manifestSrc);

  if (fs.existsSync(TARGET_DIR)) {
    console.log('🧹 Cleaning old TARGET_DIR...');
    await fse.remove(TARGET_DIR);
  }

  await fse.mkdirp(TARGET_DIR);

  const files = fs.readdirSync(OUT_DIR).filter((f) => f !== 'frontend');
  console.log(`📦 Exported root files: ${files.join(', ') || '(empty)'}`);

  for (const file of files) {
    const src = path.join(OUT_DIR, file);
    const dest = path.join(TARGET_DIR, file);
    console.log(`📁 Moving: ${src} → ${dest}`);
    await fse.move(src, dest);
  }

  if (fs.existsSync(manifestSrc)) {
    console.log('📄 Copying plugin-manifest.json...');
    await fse.copy(manifestSrc, manifestDst);
    console.log('[✔] plugin-manifest.json copied to /frontend');
  } else {
    console.error(`[❌] plugin-manifest.json NOT FOUND at: ${manifestSrc}`);
    process.exit(1);
  }

  // ⬇️ Salin hasil build dari plugin UI
  if (fs.existsSync(pluginDocsOut)) {
    await fse.copy(pluginDocsOut, targetDocsDir);
    console.log('[✔] Plugin UI copied to /frontend/docs');

    // ➕ Tambahkan .nojekyll
    const nojekyllPath = path.join(targetDocsDir, '.nojekyll');
    fs.writeFileSync(nojekyllPath, '');
    console.log('[✔] .nojekyll ditambahkan ke plugin UI export');
  } else {
    console.error(`[❌] Plugin UI output NOT FOUND at: ${pluginDocsOut}`);
    process.exit(1);
  }

  // Salin static assets dari plugin UI ke out
  const staticSrc = path.resolve(
    __dirname,
    '../plugins/mx-core-docs/src/public/static'
  );
  const staticDst = path.join(targetDocsDir, 'static');

  if (fs.existsSync(staticSrc)) {
    await fse.copy(staticSrc, staticDst);
    console.log('[✔] Static assets copied to /frontend/docs/static');
  } else {
    console.warn(`[⚠️] Static assets not found at: ${staticSrc}`);
  }

  // ⬇️ Salin static assets ke out/static (untuk lokal serve)
  const staticDstForLocal = path.resolve(
    __dirname,
    '../plugins/mx-core-docs/out/static'
  );

  if (fs.existsSync(staticSrc)) {
    await fse.copy(staticSrc, staticDstForLocal);
    console.log('[✔] Static assets copied to /out/static (for local build)');
  }

  // 🔍 Tambahkan ini
  const kbarSrc = path.resolve(
    __dirname,
    '../plugins/mx-core-docs/src/public/search-kbar.json'
  );
  const kbarDst = path.join(targetDocsDir, 'search-kbar.json');

  if (fs.existsSync(kbarSrc)) {
    await fse.copy(kbarSrc, kbarDst);
    console.log('[✔] search-kbar.json copied to /frontend');
  } else {
    console.warn('[⚠️] search-kbar.json not found.');
  }

  console.log('\n✅ Semua export berhasil dipindahkan ke: /frontend/');
}

moveExportedFiles();
