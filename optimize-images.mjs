import sharp from 'sharp';
import { readdirSync, statSync, mkdirSync, existsSync } from 'fs';
import { join, extname } from 'path';

const ASSETS_DIR = './src/assets';
const OPTIMIZED_DIR = './src/assets/optimized';
const MAX_WIDTH = 1920; // Ancho máximo para imágenes
const QUALITY = 80; // Calidad para JPG/WebP

// Crear directorio de optimizadas si no existe
if (!existsSync(OPTIMIZED_DIR)) {
  mkdirSync(OPTIMIZED_DIR, { recursive: true });
}

async function optimizeImage(inputPath, filename) {
  const ext = extname(filename).toLowerCase();

  // Solo procesar JPG y PNG
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
    console.log(`⏭️  Saltando ${filename} (no es JPG/PNG)`);
    return;
  }

  const stats = statSync(inputPath);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);

  console.log(`\n📸 Procesando: ${filename} (${sizeMB} MB)`);

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Nombre base sin extensión
    const baseName = filename.replace(extname(filename), '');

    // Optimizar como JPG
    const jpgOutput = join(OPTIMIZED_DIR, `${baseName}.jpg`);
    await image
      .resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({ quality: QUALITY, progressive: true })
      .toFile(jpgOutput);

    const jpgStats = statSync(jpgOutput);
    const jpgSizeKB = (jpgStats.size / 1024).toFixed(2);

    // Optimizar como WebP
    const webpOutput = join(OPTIMIZED_DIR, `${baseName}.webp`);
    await sharp(inputPath)
      .resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: QUALITY })
      .toFile(webpOutput);

    const webpStats = statSync(webpOutput);
    const webpSizeKB = (webpStats.size / 1024).toFixed(2);

    const reduction = ((1 - (jpgStats.size / stats.size)) * 100).toFixed(1);

    console.log(`  ✅ JPG:  ${jpgSizeKB} KB (reducción: ${reduction}%)`);
    console.log(`  ✅ WebP: ${webpSizeKB} KB`);

  } catch (error) {
    console.error(`  ❌ Error procesando ${filename}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Iniciando optimización de imágenes...\n');
  console.log(`📁 Directorio de entrada: ${ASSETS_DIR}`);
  console.log(`📁 Directorio de salida: ${OPTIMIZED_DIR}`);
  console.log(`⚙️  Configuración: Max ${MAX_WIDTH}px, Calidad ${QUALITY}%\n`);

  const files = readdirSync(ASSETS_DIR);

  for (const file of files) {
    const filePath = join(ASSETS_DIR, file);

    // Saltar directorios
    if (statSync(filePath).isDirectory()) {
      continue;
    }

    await optimizeImage(filePath, file);
  }

  console.log('\n✨ Optimización completada!');
  console.log(`\n💡 Las imágenes optimizadas están en: ${OPTIMIZED_DIR}`);
  console.log('💡 Revisa los tamaños y reemplaza las originales si estás conforme.');
}

main();
