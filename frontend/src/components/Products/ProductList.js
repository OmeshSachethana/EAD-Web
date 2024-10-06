import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllProducts, deleteProduct, updateProduct } from '../../features/products/productSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap'; // Bootstrap Modal
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications

const ProductList = () => {
    const dispatch = useDispatch();
    const { items: products, loading } = useSelector((state) => state.products);

    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productData, setProductData] = useState({
        name: '',
        category: '',
        description: '',
        quantity: '',
        price: '',
        imageUrl: '',
        isActive: false,
        imageFile: null // State for the uploaded image file
    });
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
        toast.success('Product deleted successfully!'); // Success message for delete
    };

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setProductData({
            name: product.name,
            category: product.category,
            description: product.description,
            quantity: product.quantity,
            price: product.price,
            imageUrl: product.imageUrl,
            isActive: product.isActive,
            imageFile: null // Reset the image file on edit
        });
        setShowModal(true); // Open modal for editing product
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    const handleUpdateProduct = () => {
        if (selectedProduct) {
            const updatedData = { ...productData, vendorId: selectedProduct.vendorId }; // Include vendorId if needed
            dispatch(updateProduct({ id: selectedProduct.id, productData: updatedData }));
            setShowModal(false);
            toast.success('Product updated successfully!'); // Success message for update
        }
    };

    // Handle file selection for image upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProductData({ ...productData, imageFile: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setProductData((prevData) => ({ ...prevData, imageUrl: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    if (loading) return <div className="text-center">Loading...</div>;

    // Group products by category
    const productsByCategory = products.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {});

    // Filter products based on the search term and selected category
    const filteredProducts = Object.keys(productsByCategory).reduce((acc, category) => {
        const filteredProductsInCategory = productsByCategory[category].filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory ? product.category === selectedCategory : true)
        );
        if (filteredProductsInCategory.length) {
            acc[category] = filteredProductsInCategory;
        }
        return acc;
    }, {});

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Product List</h2>
            
            {/* Search Input */}
            <div className="mb-4">
                <Form.Control 
                    type="text" 
                    placeholder="Search products..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Category Filter */}
            <div className="mb-4">
                <Form.Control 
                    as="select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="Biscuits">Biscuits</option>
                    <option value="Canned Foods">Canned Foods</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Dairy Products">Dairy Products</option>
                    <option value="Frozen Foods">Frozen Foods</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Condiments">Condiments</option>
                    <option value="Grains">Grains</option>
                    <option value="Fresh Produce">Fresh Produce</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Stationery">Stationery</option>
                </Form.Control>
            </div>

            {Object.keys(filteredProducts).map((category) => (
                <div key={category} className="mb-5">
                    <h3 className="mb-3">{category}</h3> {/* Category title */}
                    <div className="row">
                        {filteredProducts[category].map((product) => (
                            <div className="col-md-3 mb-4" key={product.id}>
                                <div className="card" style={{ height: '350px' }}>
                                    <img 
                                        src={product.imageUrl} 
                                        alt={product.name} 
                                        className="card-img-top" 
                                        style={{ height: '150px', objectFit: 'cover' }} 
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">
                                            <strong>Description:</strong> {product.description}<br />
                                            <strong>Quantity:</strong> {product.quantity}<br />
                                            <strong>Price:</strong> Rs. {product.price}<br />
                                            <strong>Status:</strong> {product.isActive ? 'Active' : 'Inactive'}
                                        </p>
                                        <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
                                        <button 
                                            className="btn btn-secondary ms-2" 
                                            onClick={() => handleEditClick(product)}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Modal for Editing Product */}
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={productData.name}
                                onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control 
                                as="select"
                                value={productData.category}
                                onChange={(e) => setProductData({ ...productData, category: e.target.value })}
                            >
                                <option value="">Select category</option>
                                <option value="Biscuits">Biscuits</option>
                                <option value="Canned Foods">Canned Foods</option>
                                <option value="Snacks">Snacks</option>
                                <option value="Dairy Products">Dairy Products</option>
                                <option value="Frozen Foods">Frozen Foods</option>
                                <option value="Beverages">Beverages</option>
                                <option value="Condiments">Condiments</option>
                                <option value="Grains">Grains</option>
                                <option value="Fresh Produce">Fresh Produce</option>
                                <option value="Bakery">Bakery</option>
                                <option value="Stationery">Stationery</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={productData.description}
                                onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={productData.quantity}
                                onChange={(e) => setProductData({ ...productData, quantity: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={productData.price}
                                onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control 
                                type="file" 
                                accept="image/*" 
                                onChange={handleFileChange} 
                            />
                        </Form.Group>
                        {productData.imageUrl && (
                            <img 
                                src={productData.imageUrl} 
                                alt="Preview" 
                                className="img-fluid mb-3" 
                                style={{ height: '100px', objectFit: 'cover' }} 
                            />
                        )}
                        <Form.Group className="mb-3">
                            <Form.Check 
                                type="checkbox" 
                                label="Active" 
                                checked={productData.isActive}
                                onChange={(e) => setProductData({ ...productData, isActive: e.target.checked })}
                                disabled
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>Close</Button>
                    <Button variant="primary" onClick={handleUpdateProduct}>Save Changes</Button>
                </Modal.Footer>
            </Modal>

            {/* Toast Container for Notifications */}
            <ToastContainer />

        </div>
    );
};

export default ProductList;
