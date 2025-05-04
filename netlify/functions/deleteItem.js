import fs from 'fs/promises';
import path from 'path';

export async function handler(event) {
  if (event.httpMethod !== 'DELETE') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { id } = event.queryStringParameters;
  const filePath = path.resolve('data', 'items.json');

  try {
    const data = await fs.readFile(filePath, 'utf-8');
    let items = JSON.parse(data);

    const initialLength = items.length;
    items = items.filter(item => item.id !== id);

    if (items.length === initialLength) {
      return { statusCode: 404, body: JSON.stringify({ message: 'Item not found' }) };
    }

    await fs.writeFile(filePath, JSON.stringify(items, null, 2));
    return { statusCode: 204 }; // No content
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to delete item', details: error.message })
    };
  }
}
