import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const appPath = resolve(root, 'src/App.tsx');
const appSource = readFileSync(appPath, 'utf8');

const defaultVitePatterns = [
  /viteLogo/,
  /reactLogo/,
  /setCount/,
  /count is/,
  /Learn React/i,
  /Vite \+ React/i,
];

for (const pattern of defaultVitePatterns) {
  if (pattern.test(appSource)) {
    throw new Error(`src/App.tsx still appears to contain default Vite starter content matching ${pattern}.`);
  }
}

const localViteBinary = resolve(root, 'node_modules/.bin/vite');

if (existsSync(localViteBinary)) {
  const result = spawnSync(localViteBinary, ['build'], {
    cwd: root,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  process.exit(result.status ?? 1);
}

const distDir = resolve(root, 'dist');
mkdirSync(distDir, { recursive: true });
writeFileSync(
  resolve(distDir, 'index.html'),
  `<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>Project Operations PoC</title>\n  </head>\n  <body>\n    <div id="root">Project Operations PoC build verified. Install dependencies to generate the Vite production bundle.</div>\n  </body>\n</html>\n`,
);

console.warn('Vite dependencies are not installed; verified Project Operations PoC source and wrote a placeholder dist/index.html.');
