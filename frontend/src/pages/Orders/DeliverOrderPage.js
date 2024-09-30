import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  markOrderAsDelivered,
  clearDeliverMessage
} from "../../features/orders/orderSlice";

const DeliverOrderPage = () => {
  const [orderId, setOrderId] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [partialDelivery, setPartialDelivery] = useState(false);
  const dispatch = useDispatch();

  // Access deliver-specific message, error, and loading state from Redux
  const { deliverMessage, deliverError, loading } = useSelector(
    (state) => state.orders
  );

  // Effect to clear deliver-specific messages after 3 seconds
  useEffect(() => {
    if (deliverMessage || deliverError) {
      const timer = setTimeout(() => {
        dispatch(clearDeliverMessage()); // Clear delivery messages
      }, 3000);
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [deliverMessage, deliverError, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      markOrderAsDelivered({
        id: orderId,
        deliveryData: { vendorId, partialDelivery },
      })
    );
  };

  return (
    <div className="container">
      <h2>Deliver Order</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <input
          type="text"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="form-control mb-3"
          required
        />
        <input
          type="text"
          placeholder="Vendor ID (optional)"
          value={vendorId}
          onChange={(e) => setVendorId(e.target.value)}
          className="form-control mb-3"
        />
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            checked={partialDelivery}
            onChange={() => setPartialDelivery(!partialDelivery)}
          />
          <label className="form-check-label">Partial Delivery</label>
        </div>
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? "Processing..." : "Mark as Delivered"}
        </button>
      </form>

      {/* Deliver Message Display */}
      {deliverMessage && (
        <div className="alert alert-info mt-3">{deliverMessage}</div>
      )}
      {/* Deliver Error Display */}
      {deliverError && (
        <div className="alert alert-danger mt-3">{deliverError}</div>
      )}
    </div>
  );
};

export default DeliverOrderPage;
