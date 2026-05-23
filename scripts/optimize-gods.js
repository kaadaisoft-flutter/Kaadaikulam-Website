import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const dirs = [
  './src/assets/Angalamman_God',
  './src/assets/Eswaran_God',
  './src/assets/Perumal_God',
];

async function run() {
  for (const dir of dirs) {
    const files = await fs.readdir(dir);
    for (const file of files) {
      if (!file.match(/\.(webp|jpg|jpeg|png)$/i)) continue;
      const filePath = path.resolve(dir, file);
      const stat = await fs.stat(filePath);
      if (stat.size < 300 * 1024) {
        console.log(`Skipping (already small): ${file}`);
        continue;
      }
      const tempPath = filePath + '.tmp.webp';
      const buf = await fs.readFile(filePath);
      await sharp(buf)
        .resize(1200, null, { withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(tempPath);
      await fs.unlink(filePath);
      // rename .webp.tmp.webp → keep original name but now optimized
      const outName = file.endsWith('.webp') ? file : file.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      const outPath = path.resolve(dir, outName);
      await fs.rename(tempPath, outPath);
      const after = await fs.stat(outPath);
      console.log(`✓ ${file}: ${(stat.size/1024/1024).toFixed(1)}MB → ${(after.size/1024).toFixed(0)}KB`);
    }
  }
  console.log('\nDone!');
}

run().catch(console.error);
