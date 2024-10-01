import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearOrderStatusMessage,
  getOrderStatus,
} from "../../features/orders/orderSlice";

const OrderStatusPage = () => {
  const [orderId, setOrderId] = useState("");
  const dispatch = useDispatch();

  // Accessing relevant state from the Redux store
  const { status, loading, message, error } = useSelector(
    (state) => state.orders
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getOrderStatus(orderId));
  };

  // Clear status message after 3 seconds
  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        dispatch(clearOrderStatusMessage()); // Clear message or error after 3 seconds
      }, 3000);

      return () => clearTimeout(timer); // Clean up timer on component unmount
    }
  }, [message, error, dispatch]);

  const OrderStatusEnum = {
    0: "Processing",
    1: "Shipped",
    2: "PartiallyDelivered",
    3: "Delivered",
    4: "Cancelled",
  };

  return (
    <div className="container">
      <h2>Check Order Status</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <input
          type="text"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="form-control mb-3"
          required
        />
        <button type="submit" className="btn btn-info" disabled={loading}>
          {loading ? "Checking..." : "Get Status"}
        </button>
      </form>

      {/* Display loading state, success message, error message, or order status */}
      {loading && <p>Loading...</p>}
      {message && <div className="alert alert-success mt-3">{message}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {status && (
        <p className="mt-3">
          <strong>Order Status:</strong>{" "}
          {OrderStatusEnum[status.status] || "Unknown Status"}
        </p>
      )}
    </div>
  );
};

export default OrderStatusPage;
