import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from '../components/LoadingScreen';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // use null to indicate loading state
  useEffect(() => {
    const checkAuthentication = async () => {
    axios.defaults.withCredentials = true;
    axios
      .get('http://localhost:8000/api/v1/users/isLoggedIn')
      .then((res) => {
        setIsAuthenticated(true);
      })
      .catch((err) => {
        setIsAuthenticated(false);
      });
};

    checkAuthentication();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Show a loading indicator while authentication status is being checked
  if (isAuthenticated === null) {
    return <LoadingScreen />;
  }

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
