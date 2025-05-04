import fs from 'fs/promises';
import path from 'path';

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const filePath = path.resolve('data', 'items.json');
  const { name, description } = JSON.parse(event.body);

  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const items = JSON.parse(data);

    const newItem = {
      id: Date.now().toString(), // simple unique ID
      name,
      description
    };

    items.push(newItem);
    await fs.writeFile(filePath, JSON.stringify(items, null, 2));

    return {
      statusCode: 201,
      body: JSON.stringify(newItem)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create item', details: error.message })
    };
  }
}
