// src/services/apiService.js
import axios from 'axios';

// Base URL for API
const API_BASE_URL = 'https://dev.cobaltfairy.online/api';

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 15000
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
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Posts service
export const postsService = {
  getPosts: async () => {
    const response = await apiClient.get('/posts');
    return response.data;
  }
};

// Users service
export const usersService = {
  createUser: async (userData) => {
    const response = await apiClient.post('/users', userData);
    return response.data;
  }
};

export default {
  posts: postsService,
  users: usersService
};