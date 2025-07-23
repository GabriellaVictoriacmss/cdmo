// src/routes/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(sessionStorage.getItem('currentUser'));

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
