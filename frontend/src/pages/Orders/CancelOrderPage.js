import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelOrder,
  clearCancelMessage,
  clearLoading,
} from "../../features/orders/orderSlice";

const CancelOrderPage = () => {
  const [orderId, setOrderId] = useState("");
  const [note, setNote] = useState("");
  const dispatch = useDispatch();

  const { cancelMessage, cancelError, loading } = useSelector(
    (state) => state.orders
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(cancelOrder({ id: orderId, note }));
  };

  // Clear messages when component unmounts or when form is submitted
  useEffect(() => {
    // Clear any loading state and cancel-related messages on mount
    dispatch(clearCancelMessage());
    dispatch(clearLoading()); // Explicitly reset loading state

    return () => {
      dispatch(clearCancelMessage()); // Clean up on unmount
    };
  }, [dispatch]);

  return (
    <div className="container">
      <h2>Cancel Order</h2>

      {/* Message Display */}
      {cancelMessage && (
        <div className="alert alert-success">{cancelMessage}</div>
      )}
      {cancelError && <div className="alert alert-danger">{cancelError}</div>}

      <form onSubmit={handleSubmit} className="form-group">
        <input
          type="text"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="form-control mb-3"
          required
        />
        <textarea
          placeholder="Cancellation Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="form-control mb-3"
          required
        />
        <button type="submit" className="btn btn-danger" disabled={loading}>
          {loading ? "Cancelling..." : "Cancel Order"}
        </button>
      </form>
    </div>
  );
};

export default CancelOrderPage;
