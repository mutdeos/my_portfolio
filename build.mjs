import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function build() {
  const inputFile = path.join(__dirname, 'css/input.css');
  const outputFile = path.join(__dirname, 'dist/output.css');
  
  // Ensure dist folder exists
  if (!fs.existsSync(path.join(__dirname, 'dist'))) {
    fs.mkdirSync(path.join(__dirname, 'dist'));
  }
  
  try {
    const input = fs.readFileSync(inputFile, 'utf-8');
    const result = await postcss([tailwindcss, autoprefixer]).process(input, {
      from: inputFile,
      to: outputFile,
    });
    
    fs.writeFileSync(outputFile, result.css);
    console.log('✓ CSS built successfully');
  } catch (error) {
    console.error('✗ Build failed:', error.message);
    process.exit(1);
  }
}

build();
