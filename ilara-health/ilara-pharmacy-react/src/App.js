import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import InventoryList from './InventoryList';
import Item from './InventoryItem';

const App = () => (
  <Router>
    <div>
      <nav>
        <Link to="/">Inventory List</Link>
      </nav>
      {/* <Route exact path="/" component={InventoryList} /> */}
      {/* <Route path="/item/:id" component={Item} /> */}
    </div>
  </Router>
);

export default App;
