import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../features/products/productSlice'; // Fetch all products action
import { Link } from 'react-router-dom'; // For navigation links
import '../../css/inventory.css';

const InventoryPage = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState(''); // State to track the search input
    const { items, loading, error } = useSelector((state) => state.products); // Get product list from Redux store
    const [filteredItems, setFilteredItems] = useState([]); // Store filtered products for display

    // Fetch all products when the component mounts
    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    // Update filteredItems whenever searchTerm or items change
    useEffect(() => {
        if (searchTerm) {
            const filtered = items.filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) // Filter products by name
            );
            setFilteredItems(filtered);
        } else {
            setFilteredItems(items); // Display all products when searchTerm is empty
        }
    }, [searchTerm, items]);

    return (
        <div className="inventory-page-container">
            {/* Left Navigation Panel */}
            <div className="nav-panel">
                <h2>Navigation</h2>
                <ul>
                    <li><Link to="/productAdd">Create Item</Link></li>
                    <li><Link to="/deleteProduct">Manage Created Items</Link></li>
                    <li><Link to="/refillProduct">Refill Stock</Link></li>
                </ul>
            </div>

            {/* Main Content Area */}
            <div className="inventory-page">
                <h1>Product Stock</h1>

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search by Product Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Update the search term state
                    className="search-bar"
                />

                {/* Loading State */}
                {loading && <p>Loading products...</p>}

                {/* Error State */}
                {error && <p>Error: {error}</p>}

                {/* Product List */}
                {!loading && filteredItems.length > 0 && (
                    <div className="inventory-list">
                        {filteredItems.map((item) => (
                            <div key={item._id} className="inventory-item">
                                <h3>Product ID: {item._id}</h3> {/* Display Product ID */}
                                <p>Product Name: {item.name}</p> {/* Display Product Name */}
                                <p>Description: {item.description}</p> {/* Display Product Description */}
                                <p>Available Quantity: {item.quantity}</p> {/* Display Quantity */}
                                <p>Vendor ID: {item.vendorId}</p> {/* Display Vendor ID */}
                            </div>
                        ))}
                    </div>
                )}

                {/* No results found */}
                {!loading && filteredItems.length === 0 && <p>No products found.</p>}
            </div>
        </div>
    );
};

export default InventoryPage;
