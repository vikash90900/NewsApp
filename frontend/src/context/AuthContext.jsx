import { createContext, useState, useEffect, useCallback } from 'react';
import { loginUser, registerUser, getUserProfile } from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const user = await getUserProfile();
      setCurrentUser(user);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch user profile:', err);
      localStorage.removeItem('token');
      setToken(null);
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [token, fetchProfile]);

  const login = async (credentials) => {
    try {
      setError(null);
      setLoading(true);
      const data = await loginUser(credentials);
      // Expected backend response may contain token and user info
      const receivedToken = data.token || data.jwt;
      if (receivedToken) {
        localStorage.setItem('token', receivedToken);
        setToken(receivedToken);
        if (data.user) {
          setCurrentUser(data.user);
        } else {
          await fetchProfile();
        }
      }
      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Login failed';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      const data = await registerUser(userData);
      const receivedToken = data.token || data.jwt;
      if (receivedToken) {
        localStorage.setItem('token', receivedToken);
        setToken(receivedToken);
        if (data.user) {
          setCurrentUser(data.user);
        } else {
          await fetchProfile();
        }
      }
      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Registration failed';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setCurrentUser(null);
    setError(null);
  };

  const value = {
    currentUser,
    token,
    isAuthenticated: !!token && !!currentUser,
    loading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
