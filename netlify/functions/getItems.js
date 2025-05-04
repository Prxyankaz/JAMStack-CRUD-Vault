import { readFile } from 'fs/promises';
import path from 'path';

export async function handler() {
  const filePath = path.resolve('data', 'items.json');
  const data = await readFile(filePath, 'utf-8');
  return {
    statusCode: 200,
    body: data,
  };
}
