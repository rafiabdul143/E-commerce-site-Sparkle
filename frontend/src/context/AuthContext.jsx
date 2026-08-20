import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginApi, registerApi, getMeApi, setAuthToken, getAuthToken } from '../services/api';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Re-hydrate session on page refresh if token exists
  useEffect(() => {
    const initAuth = async () => {
      const token = getAuthToken();
      if (token) {
        try {
          const res = await getMeApi();
          if (res.success && res.user) {
            setUser(res.user);
            setIsAuthenticated(true);
          } else {
            setAuthToken(null);
          }
        } catch (err) {
          console.error('Failed to restore session:', err);
          setAuthToken(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  /* ---------- LOGIN ---------- */
  const login = async (email, password) => {
    try {
      const res = await loginApi(email, password);
      if (res.success && res.token) {
        setAuthToken(res.token);
        setUser(res.user);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, message: res.message || 'Login failed' };
    } catch (err) {
      return { success: false, message: err.message || 'Server error during login' };
    }
  };

  /* ---------- REGISTER ---------- */
  const register = async (name, email, password, phone) => {
    try {
      const res = await registerApi(name, email, password, phone);
      if (res.success && res.token) {
        setAuthToken(res.token);
        setUser(res.user);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, message: res.message || 'Registration failed' };
    } catch (err) {
      return { success: false, message: err.message || 'Server error during registration' };
    }
  };

  /* ---------- LOGOUT ---------- */
  const logout = () => {
    setAuthToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
