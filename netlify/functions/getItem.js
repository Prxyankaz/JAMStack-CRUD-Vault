import { readFile } from 'fs/promises';
import path from 'path';

export async function handler(event) {
  const { id } = event.queryStringParameters;
  const filePath = path.resolve('data', 'items.json');
  const items = JSON.parse(await readFile(filePath, 'utf-8'));
  const item = items.find(i => i.id === id);

  if (item) {
    return {
      statusCode: 200,
      body: JSON.stringify(item),
    };
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Item not found' }),
    };
  }
}
