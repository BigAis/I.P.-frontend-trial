// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

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
      console.log('Attempting to login with credentials:', { username });
      
      // API call to login endpoint
      const response = await axios.post('https://dev.cobaltfairy.online/api/login', {
        username,
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 10000
      });
      
      console.log('Login API response:', response.data);
      
      // Get token from response
      const jwt = response.data.token;
      
      if (!jwt) {
        console.error('No token received from the API');
        throw new Error('No authentication token received from the server');
      }
      
      console.log('JWT token received successfully');
      
      // Save token to state and localStorage
      setToken(jwt);
      localStorage.setItem('jwt', jwt);
      setIsAuthenticated(true);
      setIsLoading(false);
      
      return true;
    } catch (err) {
      console.error('Login error details:', err);
      
      // Handle different types of errors
      if (err.code === 'ECONNABORTED') {
        setError('Login failed: Request timed out. The API server might be down.');
      } else if (err.message.includes('Network Error')) {
        setError('Login failed: Network Error - Could not connect to the API server.');
      } else {
        setError('Login failed: ' + (err.response?.data?.message || err.message));
      }
      
      setIsLoading(false);
      setIsAuthenticated(false);
      return false;
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