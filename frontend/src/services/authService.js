// src/services/auth.service.js
import axios from 'axios';

const API_URL = 'http://localhost:3030/api/auth'; // Update with your backend API URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add authorization token here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const authService = {
  // Register user
  async register(userData) {
    try {
      const response = await api.post('/register', {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role || 'user',
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || 'Registration failed'
        );
      }
      throw new Error('Registration failed');
    }
  },

  // Login user
  async login(credentials) {
    try {
      const response = await api.post('/login', credentials);
      return response.data;
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || 'Login failed'
        );
      }
      throw new Error('Login failed');
    }
  },

  // Logout user
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return user && token ? { user: JSON.parse(user), token } : null;
  },
};

export default authService;