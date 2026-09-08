import React, { createContext, useContext, useState, useEffect } from 'react';
import authApi from '../api/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('newshub_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('newshub_token') || null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      if (token) {
        try {
          const profileData = await authApi.getProfile();
          setUser(profileData);
          localStorage.setItem('newshub_user', JSON.stringify(profileData));
        } catch (error) {
          console.error('Failed to restore session:', error);
          logout();
        }
      }
      setLoading(false);
    };

    verifyAuth();
  }, [token]);

  const login = async (credentials) => {
    const response = await authApi.login(credentials);
    const userToken = response.token;
    const userData = response.user || { email: credentials.email, name: response.name };

    setToken(userToken);
    setUser(userData);
    localStorage.setItem('newshub_token', userToken);
    localStorage.setItem('newshub_user', JSON.stringify(userData));
    return response;
  };

  const register = async (userData) => {
    const response = await authApi.register(userData);
    if (response.token) {
      setToken(response.token);
      setUser(response.user || userData);
      localStorage.setItem('newshub_token', response.token);
      localStorage.setItem('newshub_user', JSON.stringify(response.user || userData));
    }
    return response;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('newshub_token');
    localStorage.removeItem('newshub_user');
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
