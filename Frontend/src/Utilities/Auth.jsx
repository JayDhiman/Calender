// src/components/ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import MainPage from '../screens/MainPage';

const ProtectedRoute = () => {
  const isAuthenticated = document.cookie.split('; ').some(row => row.startsWith('token='));

  // Log the authentication status
  console.log('Is Authenticated:', isAuthenticated);

  return isAuthenticated ? <MainPage /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
