// src/utils/authUtils.js

import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function useAuthNavigation() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const goToProfileOrLogin = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  return {
    user,
    logout,
    navigate,
    location,
    isActive,
    handleLogout,
    goToProfileOrLogin,
  };
}
