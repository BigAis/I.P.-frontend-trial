import axios from 'axios';

// Base URL for API
const API_BASE_URL = 'https://dev.cobaltfairy.online/api';

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      // Use 'Bearer ' prefix for the token - this is standard format for JWT auth
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data
    });
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Authentication service
export const authService = {
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Posts service
export const postsService = {
  getPosts: async () => {
    try {
      const response = await apiClient.get('/posts', {
        timeout: 5000 // Add timeout to avoid hanging requests
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Users service
export const usersService = {
  createUser: async (userData) => {
    try {
      const response = await apiClient.post('/users', userData, {
        timeout: 5000 // Add timeout to avoid hanging requests
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default {
  auth: authService,
  posts: postsService,
  users: usersService
};