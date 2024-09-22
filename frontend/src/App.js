// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar'; // Ensure this import is correct
import ProtectedRoute from './components/ProtectedRoute'; // Ensure this import is correct
import ProductPage from './pages/ProductPage'; // Import the ProductPage

const App = () => {
  const { token } = useSelector((state) => state.auth); // Get the authentication token

  return (
    <div>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={token ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/register" element={token ? <Navigate to="/" /> : <RegisterPage />} />
        
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
              <ProductPage /> {/* ProductPage is only accessible if logged in */}
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
