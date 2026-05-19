import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'apps', 'mobile', 'assets');

// Minimal valid 1x1 PNG
const minimalPng = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);

const files = ['icon.png', 'splash-icon.png', 'adaptive-icon.png', 'favicon.png'];

await mkdir(root, { recursive: true });

for (const file of files) {
  await writeFile(join(root, file), minimalPng);
}

console.log('Created Expo placeholder assets in apps/mobile/assets/');
