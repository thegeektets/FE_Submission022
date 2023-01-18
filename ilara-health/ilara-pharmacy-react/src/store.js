import { createStore } from 'redux';
import inventoryReducer from './reducers/inventoryReducers';

const store = createStore(inventoryReducer);

export default store;
