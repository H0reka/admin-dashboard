import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from './main';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(Context);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
