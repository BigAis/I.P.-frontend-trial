// src/services/authService.js
import axios from 'axios';

/**
 * Authenticate user to the API
 * @param {string} username - The username
 * @param {string} password - The password
 * @returns {Promise<Object>} - The authentication result with token
 */
export const login = async (username, password) => {
  try {
    // Make a direct request to the API
    const response = await axios({
      method: 'post',
      url: "/api/login",
      data: {
        username,
        password
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 15000
    });
    
    return response.data;
  } catch (error) {
    console.error('Login request failed:', error.message);
    
    if (error.response) {
      console.error('Error response status:', error.response.status);
    }
    
    throw error;
  }
};

export default { login };