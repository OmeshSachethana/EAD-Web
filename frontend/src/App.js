// src/App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import Navbar from "./components/Navbar"; // Ensure this import is correct
import ProtectedRoute from "./components/ProtectedRoute"; // Ensure this import is correct
import ProductPage from "./pages/Products/ProductPage"; // Import the ProductPage
import CreateOrderPage from "./pages/Orders/OrderPage";
import CancelOrderPage from "./pages/Orders/CancelOrderPage";
import DeliverOrderPage from "./pages/Orders/DeliverOrderPage";
import ShipOrderPage from "./pages/Orders/ShipOrderPage";
import OrderStatusPage from "./pages/Orders/OrderStatusPage";
import AdminProductList from "./components/Admin/AdminProductList";
import CustomersTable from "./components/Customer/CustomersTable";
import ViewProductsPage from "./pages/Products/ViewProductsPage";
import AdminOrderListing from "./pages/Orders/AdminOrderListing";
import Footer from "./components/Footer";

const App = () => {
  const { token } = useSelector((state) => state.auth); // Get the authentication token

  return (
    <div>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/" /> : <RegisterPage />}
        />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute token={token}>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute token={token}>
              <ProductPage />{" "}
              {/* ProductPage is only accessible if logged in */}
            </ProtectedRoute>
          }
        />

        {/* Order-related protected routes */}
        <Route
          path="/orders/create"
          element={
            <ProtectedRoute token={token}>
              <CreateOrderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/cancel"
          element={
            <ProtectedRoute token={token}>
              <CancelOrderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/deliver"
          element={
            <ProtectedRoute token={token}>
              <DeliverOrderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/ship"
          element={
            <ProtectedRoute token={token}>
              <ShipOrderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/status"
          element={
            <ProtectedRoute token={token}>
              <OrderStatusPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-products"
          element={
            <ProtectedRoute token={token}>
              <AdminProductList />{" "}
              {/* ProductPage is only accessible if logged in */}
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-orders"
          element={
            <ProtectedRoute token={token}>
              <AdminOrderListing />{" "}
              {/* ProductPage is only accessible if logged in */}
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <ProtectedRoute token={token}>
              <CustomersTable />{" "}
              {/* ProductPage is only accessible if logged in */}
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-products"
          element={
            <ProtectedRoute token={token}>
              <ViewProductsPage />{" "}
              {/* ProductPage is only accessible if logged in */}
            </ProtectedRoute>
          }
        />



      </Routes>
      <Footer />
    </div>
  );
};

export default App;
