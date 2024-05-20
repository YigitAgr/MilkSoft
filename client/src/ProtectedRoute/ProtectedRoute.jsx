import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('decodedToken'); // Check if token exists
    const location = useLocation();

    useEffect(() => {
        if (!isAuthenticated) {
            window.location.href = '/login';
        }
    }, [location]);

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;