import React, { useState } from 'react';

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  title: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
  },
  input: {
    padding: '8px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '3px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '3px',
    cursor: 'pointer',
  },
  updateButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
  },
};

function UpdateItem({ item, handleUpdate, handleCancel }) {
    const [updatedItem, setUpdatedItem] = useState({ ...item });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedItem(prevItem => ({
            ...prevItem,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdate(updatedItem);
    };

    const handleCancelClick = () => {
        handleCancel();
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Update Item</h2>
            <form style={styles.form} onSubmit={handleSubmit}>
                <div>
                    <label style={styles.label} htmlFor="itemName">Item Name:</label>
                    <input style={styles.input} type="text" id="itemName" name="itemName" value={updatedItem.itemName} onChange={handleChange} />
                </div>
                <div>
                    <label style={styles.label} htmlFor="category">Category:</label>
                    <input style={styles.input} type="text" id="category" name="category" value={updatedItem.category} onChange={handleChange} />
                </div>
                <div>
                    <label style={styles.label} htmlFor="quantity">Quantity:</label>
                    <input style={styles.input} type="number" id="quantity" name="quantity" value={updatedItem.quantity} onChange={handleChange} />
                </div>
                <div>
                    <label style={styles.label} htmlFor="price">Price:</label>
                    <input style={styles.input} type="number" id="price" name="price" value={updatedItem.price} onChange={handleChange} />
                </div>
                <div style={styles.buttonContainer}>
                    <button style={{ ...styles.button, ...styles.updateButton }} type="submit">Update Item</button>
                    <button style={{ ...styles.button, ...styles.cancelButton }} type="button" onClick={handleCancelClick}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default UpdateItem;
