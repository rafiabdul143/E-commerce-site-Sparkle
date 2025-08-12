import React, { createContext, useContext, useState } from 'react';

/* ---------- Demo Users ---------- */
const sampleUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', password: 'password123' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', password: 'password456' },
  { id: '3', name: 'Demo User', email: 'demo@fashion.com', password: 'demo123' }
];

/* ---------- Admin Credentials ---------- */
const adminCredentials = {
  email: 'admin@sparkle.com',
  password: 'Admin@123',
  name: 'Admin',
  id: 'admin'
};

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /* ---------- LOGIN (Admin + Regular Users) ---------- */
  const login = async (email, password) => {
    // ✅ Check for Admin First
    if (
      email.trim().toLowerCase() === adminCredentials.email &&
      password === adminCredentials.password
    ) {
      setUser({
        id: adminCredentials.id,
        name: adminCredentials.name,
        email: adminCredentials.email
      });
      setIsAuthenticated(true);
      console.log('✅ Admin logged in');
      return true;
    }

    // 🔍 Check in Sample Users
    const found = sampleUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (found) {
      setUser({ id: found.id, name: found.name, email: found.email });
      setIsAuthenticated(true);
      console.log('✅ User logged in');
      return true;
    }

    console.log('❌ Login failed');
    return false;
  };

  /* ---------- REGISTER ---------- */
  const register = async (name, email, password) => {
    const exists = sampleUsers.find((u) => u.email === email);
    if (exists) return false;

    const newUser = { id: Date.now().toString(), name, email };
    sampleUsers.push({ ...newUser, password });
    setUser(newUser);
    setIsAuthenticated(true);
    return true;
  };

  /* ---------- LOGOUT ---------- */
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
