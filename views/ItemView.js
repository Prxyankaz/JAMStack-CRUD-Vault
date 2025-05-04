export function formatItem(item) {
    return {
      ID: item.id,
      Name: item.name,
      Description: item.description
    };
  }
  
  export function formatItems(items) {
    return items.map(formatItem);
  }
  