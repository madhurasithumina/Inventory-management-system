import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faFilePdf, faSortAlphaDown, faSortAlphaUp } from '@fortawesome/free-solid-svg-icons';
import UpdateItem from './UpdateItemComponent';
import jsPDF from 'jspdf';
import axios from 'axios';

function AllItems() {
    const [inventoryItems, setInventoryItems] = useState([]);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [sortBy, setSortBy] = useState('itemName');
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        function getItems() {
            axios.get("http://localhost:8070/items/")
                .then(response => {
                    setInventoryItems(response.data);
                })
                .catch(error => {
                    console.error('Error fetching inventory items:', error);
                });
        }

        getItems();
    }, []);

    const handleUpdate = (updatedItem) => {
        axios.put(`http://localhost:8070/items/update/${updatedItem._id}`, updatedItem)
            .then(response => {
                setInventoryItems(prevItems => prevItems.map(item => item._id === updatedItem._id ? updatedItem : item));
                setShowUpdateForm(false);
                setSelectedItem(null);
            })
            .catch(error => {
                console.error('Error updating item:', error);
            });
    };

    const handleDelete = (itemId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this item?");
        if (!isConfirmed) {
            return;
        }

        axios.delete(`http://localhost:8070/items/delete/${itemId}`)
            .then(response => {
                setInventoryItems(prevItems => prevItems.filter(item => item._id !== itemId));
            })
            .catch(error => {
                console.error('Error deleting item:', error);
            });
    };

    const generateReport = () => {
        const doc = new jsPDF();

        // Set properties for the document
        doc.setFontSize(12);
        doc.text("Inventory Report", 10, 10);

        // Iterate over inventory items and add them to the PDF
        let yPos = 20;
        inventoryItems.forEach((item, index) => {
            doc.text(`${index + 1}. Item Name: ${item.itemName}, Category: ${item.category}, Quantity: ${item.quantity}, Price: ${item.price}`, 10, yPos);
            yPos += 10;
        });

        // Calculate total price
        const totalPrice = inventoryItems.reduce((total, item) => total + item.price, 0);

        // Add total price to the PDF
        doc.text(`Total of inventory value: $${totalPrice.toFixed(2)}`, 10, yPos + 10);

        // Save the document
        doc.save('inventory_report.pdf');
    };

    const sortItems = (key) => {
        const order = sortOrder === 'asc' ? 1 : -1;
        const sortedItems = [...inventoryItems].sort((a, b) => {
            if (a[key] < b[key]) return -1 * order;
            if (a[key] > b[key]) return 1 * order;
            return 0;
        });
        setInventoryItems(sortedItems);
        setSortBy(key);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredItems = inventoryItems.filter(item =>
        item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const styles = {
        updateBtn: {
            backgroundColor: 'green',
            color: 'white',
            padding: '5px 10px',
            marginRight: '5px',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer'
        },
        deleteBtn: {
            backgroundColor: 'red',
            color: 'white',
            padding: '5px 10px',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer'
        },
        icon: {
            marginRight: '5px'
        },
        reportBtn: {
            backgroundColor: '#007bff',
            color: 'white',
            padding: '5px 10px',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer'
        },
        reportButtonContainer: {
            textAlign: 'center',
            marginTop: '20px'
        },
        container: {
            marginTop: '50px' /* Adjust this value based on your header height */
        },
        searchContainer: {
            position: 'fixed',
            top: '60px', /* Adjust this value based on your header height */
            left: '0',
            width: '100%',
            backgroundColor: '#fff',
            zIndex: '999', /* Ensure search bar is above other content */
            padding: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        },
        itemsTable: {
            marginTop: '50px' /* Adjust this value based on your header and search bar height */
        },
        lowStock: {
            backgroundColor: 'rgba(255, 0, 0, 0.2)'
        }
    };

    return (
        <div style={styles.container} className="container">
            <h2>Inventory Items</h2>
            <div style={styles.searchContainer} className="search-container">
                <input
                    type="text"
                    placeholder="Search by item name..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-input"
                />
            </div>
            <table style={styles.itemsTable} className="items-table">
                <thead>
                    <tr>
                        <th onClick={() => sortItems('itemName')}>
                            Item Name
                            {sortBy === 'itemName' && <FontAwesomeIcon icon={sortOrder === 'asc' ? faSortAlphaDown : faSortAlphaUp} />}
                        </th>
                        <th onClick={() => sortItems('category')}>
                            Category
                            {sortBy === 'category' && <FontAwesomeIcon icon={sortOrder === 'asc' ? faSortAlphaDown : faSortAlphaUp} />}
                        </th>
                        <th onClick={() => sortItems('quantity')}>
                            Quantity
                            {sortBy === 'quantity' && <FontAwesomeIcon icon={sortOrder === 'asc' ? faSortAlphaDown : faSortAlphaUp} />}
                        </th>
                        <th onClick={() => sortItems('price')}>
                            Price
                            {sortBy === 'price' && <FontAwesomeIcon icon={sortOrder === 'asc' ? faSortAlphaDown : faSortAlphaUp} />}
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.map(item => (
                        <tr key={item._id} style={item.quantity < 10 ? styles.lowStock : null}>
                            <td>{item.itemName}</td>
                            <td>{item.category}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>
                                <button style={styles.updateBtn} onClick={() => {
                                    setShowUpdateForm(true);
                                    setSelectedItem(item);
                                }}>
                                    <FontAwesomeIcon style={styles.icon} icon={faEdit} />
                                    Update
                                </button>
                                <button style={styles.deleteBtn} onClick={() => handleDelete(item._id)}>
                                    <FontAwesomeIcon style={styles.icon} icon={faTrashAlt} />
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={styles.reportButtonContainer}>
                <button style={styles.reportBtn} onClick={generateReport}>
                    <FontAwesomeIcon style={styles.icon} icon={faFilePdf} />
                    Generate Report
                </button>
            </div>
            {showUpdateForm && (
                <UpdateItem item={selectedItem} handleUpdate={handleUpdate} />
            )}
        </div>
    );
}

export default AllItems;
