import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import chokidar from 'chokidar';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.resolve(__dirname, '../src');
const ASSETS_DIR = path.join(SRC_DIR, 'assets');

const isWatchMode = process.argv.includes('--watch');

const SUPPORTED_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg']);
const CODE_EXTENSIONS = new Set(['.jsx', '.js', '.css']);

async function walkDir(dir, fileCallback) {
  const files = await fs.readdir(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      await walkDir(fullPath, fileCallback);
    } else {
      await fileCallback(fullPath);
    }
  }
}

async function updateCodeReferences(oldName, newName) {
  let updatedFilesCount = 0;
  
  await walkDir(SRC_DIR, async (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    if (!CODE_EXTENSIONS.has(ext)) return;

    try {
      let content = await fs.readFile(filePath, 'utf-8');
      
      // Look for the specific filename. Since it might be an import or a URL,
      // we'll do a simple global replace of the basename.
      // This is a naive but effective approach for typical Vite imports.
      if (content.includes(oldName)) {
        // Regex to match the exact filename bounded by standard path characters
        // e.g., /filename.png, 'filename.png', "filename.png"
        const regex = new RegExp(`(?<=[/'"])${oldName}(?=['"])`, 'g');
        const newContent = content.replace(regex, newName);
        
        if (content !== newContent) {
          await fs.writeFile(filePath, newContent, 'utf-8');
          updatedFilesCount++;
        }
      }
    } catch (err) {
      console.error(`Error reading/writing file ${filePath}:`, err);
    }
  });
  
  return updatedFilesCount;
}

async function processImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!SUPPORTED_EXTENSIONS.has(ext)) return;

  const parsedPath = path.parse(filePath);
  const oldFilename = parsedPath.base;
  const newFilename = `${parsedPath.name}.webp`;
  const webpPath = path.join(parsedPath.dir, newFilename);

  try {
    // Check if a webp version already exists, skip if so (unless we're overwriting)
    try {
      await fs.access(webpPath);
      // Wait, if it exists, should we skip? Let's just overwrite for now to be safe.
    } catch (e) {
      // Doesn't exist, proceed.
    }

    console.log(`[Processing] ${oldFilename} -> ${newFilename}`);
    
    // Convert to webp
    await sharp(filePath)
      .webp({ quality: 80 })
      .toFile(webpPath);

    // Delete original
    await fs.unlink(filePath);
    console.log(`[Deleted] ${oldFilename}`);

    // Update references
    const updatedCount = await updateCodeReferences(oldFilename, newFilename);
    console.log(`[Updated] ${updatedCount} code references for ${newFilename}`);

  } catch (err) {
    console.error(`[Error] Failed to process ${filePath}:`, err);
  }
}

async function runFullOptimization() {
  console.log('Starting full image optimization sweep...');
  await walkDir(ASSETS_DIR, processImage);
  console.log('Sweep complete.');
}

if (isWatchMode) {
  console.log(`Watching for new images in ${ASSETS_DIR}...`);
  const watcher = chokidar.watch(ASSETS_DIR, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    ignoreInitial: true, // Don't process existing files on start, assume they are handled or we'll do a sweep first
  });

  watcher
    .on('add', (filePath) => {
      const ext = path.extname(filePath).toLowerCase();
      if (SUPPORTED_EXTENSIONS.has(ext)) {
        console.log(`\nNew image detected: ${path.basename(filePath)}`);
        // Add a slight delay to ensure the file is fully written before processing
        setTimeout(() => processImage(filePath), 500);
      }
    });
} else {
  runFullOptimization();
}
