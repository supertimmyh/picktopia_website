import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectRoot = join(__dirname, '..');
const srcContentDir = join(projectRoot, 'src', 'content');
const publicContentDir = join(projectRoot, 'public', 'content');

async function copyDirectory(src, dest) {
  try {
    // Create destination directory if it doesn't exist
    await mkdir(dest, { recursive: true });
    
    // Read source directory
    const entries = await readdir(src, { withFileTypes: true });
    
    for (const entry of entries) {
      const srcPath = join(src, entry.name);
      const destPath = join(dest, entry.name);
      
      if (entry.isDirectory()) {
        // Recursively copy subdirectories
        await copyDirectory(srcPath, destPath);
      } else if (entry.isFile()) {
        // Copy files
        const content = await readFile(srcPath);
        await writeFile(destPath, content);
        console.log(`Copied: ${srcPath} -> ${destPath}`);
      }
    }
  } catch (error) {
    console.error(`Error copying ${src} to ${dest}:`, error);
  }
}

async function copyContent() {
  console.log('Copying content files from src/content to public/content...');
  
  try {
    await copyDirectory(srcContentDir, publicContentDir);
    console.log('Content files copied successfully!');
  } catch (error) {
    console.error('Failed to copy content files:', error);
    process.exit(1);
  }
}

copyContent();