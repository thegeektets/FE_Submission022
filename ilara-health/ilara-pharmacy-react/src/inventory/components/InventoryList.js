import React, { useState, useEffect } from "react";
import InventoryItem from "./InventoryItem";
import EditForm from "./EditForm";
import { connect } from "react-redux";
import { fetchItems, editItem, saveItem } from "../actions/inventoryActions";
const InventoryList = () => {
  const [inventory, setInventory] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetch("https://my-inventory-api.com/items")
      .then((res) => res.json())
      .then((data) => {
        const items = data.map(
          (item) =>
            new InventoryItem(
              item.id,
              item.name,
              item.description,
              item.price,
              item.quantity
            )
        );
        setInventory(items);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleEdit = (itemId) => {
    setEditingItem(itemId);
  };

  const handleSave = (itemId, updatedItem) => {
    const updatedInventory = inventory.map((item) => {
      if (item.id === itemId) {
        return updatedItem;
      }
      return item;
    });
    setInventory(updatedInventory);
    setEditingItem(null);
  };

  return (
    <div>
      <h1>Inventory List</h1>
      {inventory.length ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>
                  {editingItem === item.id ? (
                    <EditForm
                      item={item}
                      onSave={(updatedItem) => handleSave(item.id, updatedItem)}
                      onCancel={() => setEditingItem(null)}
                    />
                  ) : (
                    <>
                      <button onClick={() => handleEdit(item.id)}>Edit</button>
                      <button>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  items: state.items,
  editingItem: state.editingItem,
});

const mapDispatchToProps = (dispatch) => ({
  fetchItems: () => dispatch(fetchItems()),
  editItem: (id) => dispatch(editItem(id)),
  saveItem: (item) => dispatch(saveItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InventoryList);
