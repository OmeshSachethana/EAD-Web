import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  markOrderAsShipped,
  clearShipMessage,
} from "../../features/orders/orderSlice";

const ShipOrderPage = () => {
  const [orderId, setOrderId] = useState("");
  const dispatch = useDispatch();

  // Access ship-specific message, error, and loading state from Redux
  const { shipMessage, shipError, loading } = useSelector(
    (state) => state.orders
  );

  // Effect to clear ship-specific messages after 3 seconds
  useEffect(() => {
    if (shipMessage || shipError) {
      const timer = setTimeout(() => {
        dispatch(clearShipMessage()); // Clear shipping messages
      }, 3000);
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [shipMessage, shipError, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(markOrderAsShipped(orderId));
  };

  return (
    <div className="container mx-auto mt-5">
      <h2 className="text-2xl font-bold mb-4">Ship Order</h2>

      {/* Ship Message Display */}
      {shipMessage && (
        <div className="mb-4 p-3 rounded bg-green-200 text-green-800">
          {shipMessage}
        </div>
      )}
      {/* Ship Error Display */}
      {shipError && (
        <div className="mb-4 p-3 rounded bg-red-200 text-red-800">
          {shipError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-group">
        <input
          type="text"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="form-control mb-3 p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="btn btn-primary px-4 py-2"
          disabled={loading}
        >
          {loading ? "Processing..." : "Mark as Shipped"}
        </button>
      </form>
    </div>
  );
};

export default ShipOrderPage;
