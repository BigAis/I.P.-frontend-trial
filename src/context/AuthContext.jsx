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
      const response = await axios.post('https://dev.cobaltfairy.online/api/login', {
        username,
        password
      });
      
      // Assuming the JWT is returned in the response data
      const jwt = response.data.token;
      
      // Save token to state and localStorage
      setToken(jwt);
      localStorage.setItem('jwt', jwt);
      setIsAuthenticated(true);
      setIsLoading(false);
      
      return true;
    } catch (err) {
      setError('Login failed: ' + (err.response?.data?.message || err.message));
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