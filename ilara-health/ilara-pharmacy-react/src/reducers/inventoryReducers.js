const initialState = {
    items: [],
    editingItem: null
  };
  
  const inventoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_ITEMS':
        return {
          ...state,
          items: action.payload
        };
      case 'EDIT_ITEM':
        return {
          ...state,
          editingItem: action.payload
        };
      case 'SAVE_ITEM':
        return {
          ...state,
          items: state.items.map(item => {
            if (item.id === action.payload.id) {
              return action.payload;
            }
            return item;
          }),
          editingItem: null
        };
      default:
        return state;
    }
  };
  
  export default inventoryReducer;
  