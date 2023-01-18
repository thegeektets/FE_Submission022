export const fetchItems = items => ({
    type: 'FETCH_ITEMS',
    payload: items
  });
  
  export const editItem = id => ({
    type: 'EDIT_ITEM',
    payload: id
  });
  
  export const saveItem = item => ({
    type: 'SAVE_ITEM',
    payload: item
  });
  