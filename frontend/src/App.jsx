import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';

import { AuthProvider, useAuth } from './context/AuthContext';

/* ---------- User Pages ---------- */
import UserLayout from './components/Layout/UserLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CollectionsPage from './pages/CollectionsPage';
import ProductDetails from './components/product/ProductDetails';
import Checkout from './components/Cart/Checkout';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderDetails from './pages/OrderDetails';
import MyordersPage from './pages/MyordersPage';
import PhoneOTP from './pages/PhoneOTP';

/* ---------- Admin Pages ---------- */
import AdminLayout from './admin2/AdminLayout';
import Dashboard from './admin2/PAGES/Dashboard';
import Products from './admin2/PAGES/Products';
import Users from './admin2/PAGES/Users';
import Orders from './admin2/PAGES/Orders';
import Settings from './admin2/PAGES/Settings';
import LoginAdmin from './admin2/PAGES/LoginAdmin';
import RegisterAdmin from './admin2/PAGES/RegisterAdmin';

/* ---------- Protected Route Helper ---------- */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => (
  <AuthProvider>
    <Router>
      <Toaster position="top-right" />

      <Routes>
        {/* ---------- USER ROUTES ---------- */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="collections/:collections" element={<CollectionsPage />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="order/:id" element={<OrderDetails />} />
          <Route path="my-orders" element={<MyordersPage />} />
          <Route path="phone-login" element={<PhoneOTP />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* ---------- ADMIN ROUTES ---------- */}
        <Route path="/admin-login" element={<LoginAdmin />} />
        <Route path="/admin-register" element={<RegisterAdmin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
          <Route path="analytics" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* ---------- CATCH‑ALL ---------- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
