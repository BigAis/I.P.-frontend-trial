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
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
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
      const response = await apiClient.get('/posts');
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
      const response = await apiClient.post('/users', userData);
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