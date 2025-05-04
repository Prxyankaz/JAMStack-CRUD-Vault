import fs from 'fs/promises';
import path from 'path';

export async function handler(event) {
  if (event.httpMethod !== 'PUT') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { id } = event.queryStringParameters;
  const filePath = path.resolve('data', 'items.json');
  const { name, description } = JSON.parse(event.body);

  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const items = JSON.parse(data);

    const index = items.findIndex(item => item.id === id);
    if (index === -1) {
      return { statusCode: 404, body: JSON.stringify({ message: 'Item not found' }) };
    }

    items[index] = { ...items[index], name, description };
    await fs.writeFile(filePath, JSON.stringify(items, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify(items[index])
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to update item', details: error.message })
    };
  }
}
