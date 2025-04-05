// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

// Create context
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check for existing token in localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('jwt');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await authService.login(username, password);
      
      // Get token from response
      const jwt = data.token;
      
      if (!jwt) {
        throw new Error('No authentication token received from the server');
      }
      
      // Save token to state and localStorage
      setToken(jwt);
      localStorage.setItem('jwt', jwt);
      setIsAuthenticated(true);
      
      return true;
    } catch (err) {
      // Handle different types of errors
      if (err.code === 'ECONNABORTED') {
        setError('Login failed: Request timed out. Please try again later.');
      } else if (err.message.includes('Network Error')) {
        setError('Login failed: Network connection error. Please check your internet connection.');
      } else if (err.response?.status === 401) {
        setError('Login failed: Invalid credentials. Please check your username and password.');
      } else {
        setError('Login failed: ' + (err.response?.data?.message || err.message));
      }
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setToken('');
    setIsAuthenticated(false);
    localStorage.removeItem('jwt');
  };

  // Create context value object
  const contextValue = {
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};