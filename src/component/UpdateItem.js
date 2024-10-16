import React, { useState, useEffect } from "react";
import axios from "axios";

export default function InventoryManagement() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    quantity: "",
    price: ""
  });

  useEffect(() => {
    fetchInventoryItems();
  }, []);

  const fetchInventoryItems = async () => {
    try {
      const response = await axios.get("http://localhost:8070/items/");
      setInventoryItems(response.data);
    } catch (error) {
      console.error("Error fetching inventory items:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8070/items/add", formData);
      fetchInventoryItems();
      setFormData({
        itemName: "",
        category: "",
        quantity: "",
        price: ""
      });
      alert("Inventory Item Added!");
    } catch (error) {
      console.error("Error adding inventory item:", error);
      alert("Error adding inventory item");
    }
  };

  const handleUpdate = async (itemId) => {
    try {
      await axios.put(`http://localhost:8070/items/update/${itemId}`, formData);
      fetchInventoryItems();
      alert("Inventory Item Updated!");
    } catch (error) {
      console.error("Error updating inventory item:", error);
      alert("Error updating inventory item");
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8070/items/delete/${itemId}`);
      fetchInventoryItems();
      alert("Inventory Item Deleted!");
    } catch (error) {
      console.error("Error deleting inventory item:", error);
      alert("Error deleting inventory item");
    }
  };

  return (
    <div>
      <h2>Inventory Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item Name"
          name="itemName"
          value={formData.itemName}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        <button type="submit">Add Item</button>
      </form>

      <ul>
        {inventoryItems.map((item) => (
          <li key={item._id}>
            {item.itemName} - {item.quantity} in stock
            <button onClick={() => handleUpdate(item._id)}>Update</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
