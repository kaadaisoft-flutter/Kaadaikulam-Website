import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const directories = [
  { name: 'Angalamman_Temple', folder: './src/assets/Angalamman_Temple', labelEn: 'Sri Angalamman Temple, Erode', labelTa: 'ஸ்ரீ அருள்மிகு அங்காளம்மன் கோவில்' },
  { name: 'Eswaran_Temple', folder: './src/assets/Eswaran_Temple', labelEn: 'Sri Pushpavaneswara Swamy Temple, Erode', labelTa: 'ஸ்ரீ புஷ்பவனேசுவர சுவாமி திருக்கோயில்' },
  { name: 'Perumal_Temple', folder: './src/assets/Perumal_Temple', labelEn: 'Sri Damodara Perumal Temple, Erode', labelTa: 'ஸ்ரீ தாமோதர பெருமாள் திருக்கோயில்' }
];

async function run() {
  const imports = [];
  const items = [];
  let idCounter = 3; // Starting from 3 because id 1 and 2 are already used (Mandala Pooja and drone view)

  for (const dir of directories) {
    const files = await fs.readdir(dir.folder);
    let imageIndex = 1;
    for (const file of files) {
      // Process only the newly added DJI drone/photo files
      if ((file.startsWith('DJI_') || file.startsWith('P - DJI_')) && file.endsWith('.webp')) {
        const filePath = path.resolve(dir.folder, file);
        const tempPath = filePath + '.temp.webp';

        try {
          const statsBefore = await fs.stat(filePath);
          
          // Read to buffer first to prevent sharp from holding a file lock
          const inputBuffer = await fs.readFile(filePath);
          
          await sharp(inputBuffer)
            .resize(800, null, { withoutEnlargement: true })
            .webp({ quality: 75 })
            .toFile(tempPath);
            
          await fs.unlink(filePath);
          await fs.rename(tempPath, filePath);
          
          const statsAfter = await fs.stat(filePath);
          console.log(`Optimized ${file}: ${(statsBefore.size/1024/1024).toFixed(2)}MB -> ${(statsAfter.size/1024).toFixed(2)}KB`);

          // Generate JavaScript variable name
          const varName = `${dir.name.toLowerCase()}_${imageIndex++}`;
          imports.push(`import ${varName} from "../assets/${dir.name}/${file}";`);
          
          items.push(`    {
      id: ${idCounter++},
      title: language === "ta" ? "${dir.labelTa} - ${imageIndex - 1}" : "${dir.labelEn} - ${imageIndex - 1}",
      category: "Temples",
      image: ${varName},
      temple: language === "ta" ? "${dir.labelTa}" : "${dir.labelEn}"
    }`);
        } catch (err) {
          console.error(`Error processing ${file}:`, err);
        }
      }
    }
  }

  // Print results
  console.log('\n--- IMPORTS TO COPY ---');
  console.log(imports.join('\n'));
  console.log('\n--- ITEMS TO COPY ---');
  console.log(items.join(',\n'));
}

run();
