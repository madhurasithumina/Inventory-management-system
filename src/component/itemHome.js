import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAlphaDown, faSortAlphaUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function ItemHome() { // Rename the component to ItemHome
    const [inventoryItems, setInventoryItems] = useState([]);
    const [sortBy, setSortBy] = useState('itemName');
    const [sortOrder, setSortOrder] = useState('asc');

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

    const styles = {
        container: {
            marginTop: '50px' /* Adjust this value based on your header height */
        },
        itemsTable: {
            marginTop: '20px' /* Adjust this value based on your header height */
        }
    };

    return (
        <div style={styles.container} className="container">
            <h2>Inventory Items</h2>
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
                    </tr>
                </thead>
                <tbody>
                    {inventoryItems.map(item => (
                        <tr key={item._id}>
                            <td>{item.itemName}</td>
                            <td>{item.category}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ItemHome; // Export the component as ItemHome
