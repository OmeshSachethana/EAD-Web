// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar'; // Ensure this import is correct
import ProtectedRoute from './components/ProtectedRoute'; // Ensure this import is correct

const App = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={token ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/register" element={token ? <Navigate to="/" /> : <RegisterPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute token={token}>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
