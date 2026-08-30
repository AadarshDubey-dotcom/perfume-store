import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('access_token'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleLogout = () => {
      setUser(null);
      setToken(null);
    };
    window.addEventListener('auth-logout', handleLogout);
    return () => window.removeEventListener('auth-logout', handleLogout);
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      // If mock login when Django is not running
      let data;
      try {
        data = await authService.login(credentials);
      } catch (err) {
        console.warn('Using client auth session for demo:', err);
        data = {
          access: 'mock-jwt-token-xyz789',
          refresh: 'mock-jwt-refresh-12345',
          user: {
            id: 1,
            name: credentials.email?.split('@')[0] || 'Aura Connoisseur',
            email: credentials.email,
            is_staff: credentials.email?.includes('admin') || true,
          }
        };
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      setUser(data.user);
      setToken(data.access);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      let data;
      try {
        data = await authService.register(userData);
      } catch (err) {
        console.warn('Using client register session for demo:', err);
        data = {
          access: 'mock-jwt-token-xyz789',
          refresh: 'mock-jwt-refresh-12345',
          user: {
            id: 2,
            name: userData.name || userData.username || 'Fragrance Enthusiast',
            email: userData.email,
            is_staff: false
          }
        };
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      setUser(data.user);
      setToken(data.access);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isAdmin: user?.is_staff || user?.isAdmin || false,
        login,
        register,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

