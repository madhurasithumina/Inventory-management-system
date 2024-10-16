// UpdateInventoryItem.js

import React from "react";

export default function UpdateInventoryItem({ item, handleUpdate }) {
  return (
    <div className="details">
      <h2>Update Details</h2>
      <p>Item Name: {item.itemName}</p>
      <p>Category: {item.category}</p>
      <p>Quantity: {item.quantity}</p>
      <p>Price: {item.price}</p>
      <div>
        <button onClick={() => handleUpdate(item._id)}>Update</button>
      </div>
    </div>
  );
}
