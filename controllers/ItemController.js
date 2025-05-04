import { readItems, writeItems } from '../models/ItemModel.js';

export async function getAllItems() {
  return await readItems();
}

export async function getItemById(id) {
  const items = await readItems();
  return items.find(i => i.id === id);
}

export async function createItem(data) {
  const items = await readItems();
  const newItem = { id: Date.now(), ...data };
  items.push(newItem);
  await writeItems(items);
  return newItem;
}

export async function updateItem(id, data) {
  const items = await readItems();
  const idx = items.findIndex(i => i.id === id);
  if (idx < 0) return null;
  items[idx] = { ...items[idx], ...data };
  await writeItems(items);
  return items[idx];
}

export async function deleteItem(id) {
  let items = await readItems();
  const before = items.length;
  items = items.filter(i => i.id !== id);
  await writeItems(items);
  return items.length < before;
}
