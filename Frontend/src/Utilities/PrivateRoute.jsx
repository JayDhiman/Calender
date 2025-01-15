import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuthenticated, selectUser } from '../Service/Auth/authService';






const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  if (!isAuthenticated && !user) {
    
    // If the user is not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }

  return children;  // Render the children components if authenticated
};

export default PrivateRoute;