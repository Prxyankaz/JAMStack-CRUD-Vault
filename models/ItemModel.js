import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = join(__dirname, '../data/items.json');

export async function readItems() {
  const raw = await readFile(DATA_PATH, 'utf8');
  return JSON.parse(raw);
}

export async function writeItems(items) {
  await writeFile(DATA_PATH, JSON.stringify(items, null, 2), 'utf8');
}
