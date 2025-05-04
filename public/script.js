// GET all items
fetch('/.netlify/functions/getItems')
  .then(response => response.json())
  .then(items => {
    console.log('All items:', items);  // You can display items on the page
  })
  .catch(error => console.error('Error fetching items:', error));

// GET one item by ID (replace `id` with the actual ID)
const id = '1';  // You would replace this with dynamic data (e.g., from user input or a list)
fetch(`/.netlify/functions/getItem?id=${id}`)
  .then(response => response.json())
  .then(item => {
    console.log('Single item:', item);  // Handle and display a single item on the page
  })
  .catch(error => console.error('Error fetching item:', error));

// POST - Create a new item
const name = 'New Item';  // Replace with dynamic data
const description = 'This is a new item.';  // Replace with dynamic data

fetch('/.netlify/functions/createItem', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',  // Important: Tell the server it's JSON data
  },
  body: JSON.stringify({ name, description })
})
  .then(response => response.json())
  .then(newItem => {
    console.log('New item created:', newItem);  // Handle the newly created item
  })
  .catch(error => console.error('Error creating item:', error));

// PUT - Update an existing item by ID
const updatedName = 'Updated Item';
const updatedDescription = 'This item has been updated.';

fetch(`/.netlify/functions/updateItem?id=${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',  // Important: Tell the server it's JSON data
  },
  body: JSON.stringify({
    name: updatedName,
    description: updatedDescription
  })
})
  .then(response => response.json())
  .then(updatedItem => {
    console.log('Item updated:', updatedItem);  // Handle the updated item
  })
  .catch(error => console.error('Error updating item:', error));

// DELETE - Delete an item by ID
fetch(`/.netlify/functions/deleteItem?id=${id}`, {
  method: 'DELETE',
})
  .then(response => {
    if (response.status === 204) {
      console.log('Item deleted');  // Confirm item has been deleted
    } else {
      console.error('Failed to delete item');  // Handle error if deletion failed
    }
  })
  .catch(error => console.error('Error deleting item:', error));
