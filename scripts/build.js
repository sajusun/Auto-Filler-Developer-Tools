import { build } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

async function runBuild() {
  const rootDir = process.cwd();
  const distDir = resolve(rootDir, 'dist');

  // Step 1: Clean dist
  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
  }
  fs.mkdirSync(distDir, { recursive: true });

  console.log('📦 Step 1: Building Popup and Options HTML pages...');
  await build({
    configFile: false,
    base: '',
    build: {
      outDir: 'dist',
      emptyOutDir: false,
      rollupOptions: {
        input: {
          popup: resolve(rootDir, 'src/popup/popup.html'),
          options: resolve(rootDir, 'src/options/options.html')
        }
      }
    }
  });

  console.log('⚡ Step 2: Building standalone Content Script (IIFE, self-contained)...');
  await build({
    configFile: false,
    build: {
      outDir: 'dist',
      emptyOutDir: false,
      lib: {
        entry: resolve(rootDir, 'src/content/index.ts'),
        name: 'DevFillContent',
        formats: ['iife'],
        fileName: () => 'content.js'
      }
    }
  });

  console.log('⚙️ Step 3: Building standalone Background Service Worker (ES Module)...');
  await build({
    configFile: false,
    build: {
      outDir: 'dist',
      emptyOutDir: false,
      lib: {
        entry: resolve(rootDir, 'src/background/index.ts'),
        formats: ['es'],
        fileName: () => 'background.js'
      }
    }
  });

  console.log('📋 Step 4: Copying Manifest and Icons...');
  const manifest = fs.readFileSync(resolve(rootDir, 'manifest.json'), 'utf-8');
  fs.writeFileSync(resolve(distDir, 'manifest.json'), manifest);

  const iconsSrc = resolve(rootDir, 'public/icons');
  const iconsDist = resolve(distDir, 'icons');
  if (fs.existsSync(iconsSrc)) {
    fs.cpSync(iconsSrc, iconsDist, { recursive: true });
  }

  console.log('✅ Extension build completed successfully! Unpacked directory is ready in ./dist');
}

runBuild().catch((err) => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
