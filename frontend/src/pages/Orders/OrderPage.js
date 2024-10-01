import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrder,
  clearCreateOrderMessage,
} from "../../features/orders/orderSlice";

const CreateOrderPage = () => {
  const [customerId, setCustomerId] = useState("");
  const [products, setProducts] = useState([
    { productId: "", vendorId: "", quantity: 1 },
  ]);
  const [notes, setNotes] = useState("");
  const dispatch = useDispatch();
  const { loading, createMessage, createError } = useSelector(
    (state) => state.orders
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = { customerId, products, notes };
    dispatch(createOrder(orderData));
  };

  const handleClearMessage = () => {
    dispatch(clearCreateOrderMessage());
  };

  return (
    <div className="container">
      <h2>Create Order</h2>
      {createMessage && (
        <div className="alert alert-success alert-dismissible">
          {createMessage}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={handleClearMessage}
          ></button>
        </div>
      )}
      {createError && (
        <div className="alert alert-danger alert-dismissible">
          {createError}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={handleClearMessage}
          ></button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="form-group">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
        <textarea
          className="form-control mb-3"
          placeholder="Order Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        {/* Add product input fields dynamically */}
        {products.map((product, index) => (
          <div key={index} className="form-group mb-3">
            <input
              type="text"
              placeholder="Product ID"
              value={product.productId}
              onChange={(e) =>
                setProducts(
                  products.map((p, i) =>
                    i === index ? { ...p, productId: e.target.value } : p
                  )
                )
              }
              className="form-control"
            />
            <input
              type="text"
              placeholder="Vendor ID"
              value={product.vendorId}
              onChange={(e) =>
                setProducts(
                  products.map((p, i) =>
                    i === index ? { ...p, vendorId: e.target.value } : p
                  )
                )
              }
              className="form-control"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={product.quantity}
              onChange={(e) =>
                setProducts(
                  products.map((p, i) =>
                    i === index ? { ...p, quantity: e.target.value } : p
                  )
                )
              }
              className="form-control"
            />
          </div>
        ))}
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Creating Order..." : "Create Order"}
        </button>
      </form>
    </div>
  );
};

export default CreateOrderPage;
