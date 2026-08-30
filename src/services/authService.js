import api from './api';

export const authService = {
  // Login with email/username and password
  async login(credentials) {
    try {
      const response = await api.post('/auth/login/', credentials);
      const data = response.data;
      
      // Store JWT tokens in localStorage
      if (data.access) localStorage.setItem('access_token', data.access);
      if (data.refresh) localStorage.setItem('refresh_token', data.refresh);
      if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
      
      return data;
    } catch (error) {
      throw error.response?.data || { detail: 'Login failed' };
    }
  },

  // Signup / Register a new user
  async register(userData) {
    try {
      const response = await api.post('/auth/register/', userData);
      const data = response.data;
      
      if (data.access) localStorage.setItem('access_token', data.access);
      if (data.refresh) localStorage.setItem('refresh_token', data.refresh);
      if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
      
      return data;
    } catch (error) {
      throw error.response?.data || { detail: 'Registration failed' };
    }
  },

  // Get current user profile
  async getCurrentUser() {
    try {
      const response = await api.get('/auth/user/');
      return response.data;
    } catch (error) {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    }
  },

  // Logout
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }
};

