import React, { useState } from "react";
import backgroundImage from "../images/bg.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddInventoryItem() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    quantity: 0,
    price: ""
  });
  const [errors, setErrors] = useState({
    itemName: "",
    category: "",
    quantity: "",
    price: ""
  });

  const categories = ["Electronics", "Furnitures", "Stationaries", "Others"];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "quantity" ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    let formIsValid = true;
    const newErrors = { ...errors };

    if (formData.itemName.trim() === "") {
      newErrors.itemName = "Item Name is required";
      formIsValid = false;
    } else {
      newErrors.itemName = "";
    }

    if (formData.category === "") {
      newErrors.category = "Category is required";
      formIsValid = false;
    } else {
      newErrors.category = "";
    }

    if (formData.quantity <= 0) {
      newErrors.quantity = "Quantity must be greater than zero";
      formIsValid = false;
    } else {
      newErrors.quantity = "";
    }

    if (!/^\d+(\.\d{1,2})?$/.test(formData.price)) {
      newErrors.price = "Price must be a valid number";
      formIsValid = false;
    } else {
      newErrors.price = "";
    }

    setErrors(newErrors);

    if (formIsValid) {
      try {
        const response = await axios.post(
          "http://localhost:8070/items/add",
          formData
        );

        // Handle response from the backend
        console.log("Item added successfully:", response.data);
        // Show alert for successful item addition
        window.alert("Item added successfully!");

        // Optionally, you can navigate to another page after adding the item
        navigate("/allItems"); // Navigate to success page
      } catch (error) {
        console.error("Error adding item:", error);
        // Handle error
      }
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`, // Set the background image
        backgroundSize: "cover", // Ensure the image covers the entire background
        backgroundRepeat: "no-repeat", // Prevent image from repeating
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "300px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "20px",
          borderRadius: "10px"
        }}
      >
        <div className="mb-3">
          <label htmlFor="exampleInputItemName" className="form-label">
            Item Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputItemName"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
          />
          {errors.itemName && (
            <div className="text-danger">{errors.itemName}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputCategory" className="form-label">
            Category
          </label>
          <select
            className="form-select"
            id="exampleInputCategory"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <div className="text-danger">{errors.category}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputQuantity" className="form-label">
            Quantity
          </label>
          <input
            type="number"
            min="0"
            className="form-control"
            id="exampleInputQuantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
          {errors.quantity && (
            <div className="text-danger">{errors.quantity}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPrice" className="form-label">
            Price (Rs.)
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPrice"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          {errors.price && <div className="text-danger">{errors.price}</div>}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
