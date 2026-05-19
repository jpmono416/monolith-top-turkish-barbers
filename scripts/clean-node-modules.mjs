import { execSync } from 'node:child_process';
import { rm } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');

const targets = [
  join(root, 'node_modules'),
  join(root, 'apps', 'api', 'node_modules'),
  join(root, 'apps', 'web', 'node_modules'),
  join(root, 'apps', 'mobile', 'node_modules'),
  join(root, 'packages', 'config', 'node_modules'),
  join(root, 'packages', 'types', 'node_modules'),
  join(root, 'packages', 'ui', 'node_modules'),
  join(root, 'packages', 'eslint-config', 'node_modules'),
];

for (const target of targets) {
  try {
    await rm(target, { recursive: true, force: true });
    console.log(`Removed ${target}`);
  } catch {
    // Docker on Windows can leave .ignored_* files that Node cannot unlink.
    if (process.platform === 'win32') {
      execSync(`cmd /c rmdir /s /q "${target}"`, { stdio: 'inherit' });
      console.log(`Force-removed ${target}`);
    } else {
      throw new Error(`Failed to remove ${target}`);
    }
  }
}

console.log('Done. Run: pnpm install');
