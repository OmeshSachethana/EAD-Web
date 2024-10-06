import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, cancelOrder } from "../../features/orders/orderSlice";
import { format } from "date-fns";

const AdminOrderListing = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showError, setShowError] = useState(false);

  // Fetch all orders when component mounts
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setShowError(true); // Show error message
      const timer = setTimeout(() => {
        setShowError(false); // Hide error message after 4 seconds
      }, 4000);

      return () => clearTimeout(timer); // Cleanup timeout on unmount or error change
    }
  }, [error]);

  // Handle cancel order
  const handleCancelOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      const resultAction = await dispatch(
        cancelOrder({ id: orderId, note: "Cancelled by Admin" })
      );

      // Check if the cancelOrder was fulfilled
      if (cancelOrder.fulfilled.match(resultAction)) {
        // Refetch all orders after successful cancellation
        dispatch(getAllOrders());
      }
    }
  };

  // Handle view order details (open modal)
  const handleViewOrder = (order) => {
    setSelectedOrder(order); // Set selected order for modal
  };

  // Handle close modal
  const closeModal = () => {
    setSelectedOrder(null);
  };

  // Helper function to format dates
  const formatDate = (date) => {
    return date ? format(new Date(date), "dd/MM/yyyy HH:mm") : "N/A";
  };

  // Helper function to convert order status integer to string
  const getOrderStatusLabel = (status) => {
    switch (status) {
      case 0:
        return "Processing";
      case 1:
        return "Shipped";
      case 2:
        return "Partially Delivered";
      case 3:
        return "Delivered";
      case 4:
        return "Cancelled";
      default:
        return "Unknown"; // Handle unknown status gracefully
    }
  };

  // Helper function to apply row class based on status
  const getStatusRowClass = (status) => {
    switch (status) {
      case 0:
        return ""; // No special class for Processing
      case 1:
        return "table-info"; // Light blue for shipped
      case 2:
        return "table-warning"; // Yellow for partially delivered
      case 3:
        return "table-success"; // Light green for delivered
      case 4:
        return "table-danger"; // Red for cancelled
      default:
        return "";
    }
  };

  // Render loading spinner if loading
  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border" role="status" />
      </div>
    );
  }

  // Render no orders message if no orders found
  if (orders.length === 0) {
    return (
      <div className="alert alert-warning text-center my-5">
        No orders found.
      </div>
    );
  }

  // Create a sorted copy of orders by updatedAt in descending order
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  return (
    <div className="container my-5">
      <h1 className="mb-4">Admin - All Orders</h1>

      {/* Display error message if there's an error */}
      {showError && error && (
        <div className="alert alert-danger text-center my-3">{error}</div>
      )}

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Dispatched At</th>
              <th>Delivered At</th>
              <th>Is Cancelled?</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((order) => (
              <tr key={order.id} className={getStatusRowClass(order.status)}>
                <td>{order.id}</td>
                <td>{order.customerId}</td>
                <td>{getOrderStatusLabel(order.status)}</td>
                <td>{formatDate(order.createdAt)}</td>
                <td>{formatDate(order.dispatchedAt)}</td>
                <td>{formatDate(order.deliveredAt)}</td>
                <td>{order.isCancelled ? "Yes" : "No"}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleViewOrder(order)}
                    data-toggle="modal"
                    data-target="#orderDetailsModal"
                  >
                    View
                  </button>
                  &nbsp;&nbsp;
                  {!order.isCancelled && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Viewing Order Details */}
      {selectedOrder && (
        <div
          className="modal fade show mt-5"
          id="orderDetailsModal"
          tabIndex="-1"
          style={{ display: "block" }}
          role="dialog"
        >
          <div
            className="modal-dialog modal-lg shadow mb-5 bg-white rounded"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Order Details (ID: {selectedOrder.id})
                </h5>
                <button type="button" className="close" onClick={closeModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Customer ID:</strong> {selectedOrder.customerId}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {getOrderStatusLabel(selectedOrder.status)}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {formatDate(selectedOrder.createdAt)}
                </p>
                <p>
                  <strong>Dispatched At:</strong>{" "}
                  {formatDate(selectedOrder.dispatchedAt)}
                </p>
                <p>
                  <strong>Delivered At:</strong>{" "}
                  {formatDate(selectedOrder.deliveredAt)}
                </p>
                <p>
                  <strong>Is Partially Delivered?</strong>{" "}
                  {selectedOrder.isPartiallyDelivered ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Is Cancelled?</strong>{" "}
                  {selectedOrder.isCancelled ? "Yes" : "No"}
                </p>
                {selectedOrder.isCancelled && (
                  <p>
                    <strong>Cancellation Note:</strong>{" "}
                    {selectedOrder.cancellationNote}
                  </p>
                )}
                <h5>Products</h5>
                <ul>
                  {selectedOrder.products.map((product, index) => (
                    <li key={index}>
                      {product.name} - Qty: {product.quantity}
                    </li>
                  ))}
                </ul>
                <p>
                  <strong>Notes:</strong>{" "}
                  {selectedOrder.notes || "No additional notes"}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderListing;
