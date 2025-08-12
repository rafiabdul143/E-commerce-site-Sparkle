import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Shield,
  Sparkles,
  Star,
  Zap,
  Crown,
  Gem,
  BarChart3,
  Users,
  Settings,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';



const LoginAdmin = ({ onSwitchToRegister }) => {
const [formData, setFormData] = useState({
  email: 'admin@sparkle.com',
  password: 'Admin@123',
});
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { login, isAuthenticated } = useAuth();


const navigate = useNavigate();

  const validateForm = () => {
    const err = {};
    if (!formData.email) err.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) err.email = 'Enter a valid email';
    if (!formData.password) err.password = 'Password is required';
    else if (formData.password.length < 6) err.password = 'Min 6 characters';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  const ok = await login(formData.email.trim().toLowerCase(), formData.password.trim());
  console.log('Login result:', ok);
  if (ok) {
    console.log('Navigating to dashboard...');
    navigate('/admin'); // or '/admin' based on your route
  } else {
    console.log('Login failed');
    setErrors((p) => ({ ...p, password: 'Invalid email or password' }));
  }
};

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  return (
    <div className="min-h-screen flex flex-col-reverse lg:flex-row bg-gradient-to-br from-black via-zinc-900 to-red-900">
      {/* ===== Left (Login Form) ===== */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12">
  <div className="w-full max-w-md">
    <div className="bg-red-800/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-red-700/40">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-red-600 to-red-800 p-4 rounded-2xl shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Welcome&nbsp;Back</h1>
        <div className="h-1 w-12 bg-gradient-to-r from-red-500 to-red-700 mx-auto mb-4" />
        <p className="text-red-400 text-lg font-semibold">ADMIN PORTAL</p>
        <p className="text-gray-400 text-sm mt-2">Access your business dashboard</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@company.com"
              className={`w-full pl-12 pr-4 py-3 rounded-xl bg-black/60 text-white placeholder-gray-500 border ${
                errors.email ? 'border-red-500' : 'border-red-700'
              } focus:outline-none focus:border-red-500`}
            />
          </div>
          {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className={`w-full pl-12 pr-12 py-3 rounded-xl bg-black/60 text-white placeholder-gray-500 border ${
                errors.password ? 'border-red-500' : 'border-red-700'
              } focus:outline-none focus:border-red-500`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-400"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {errors.password && <p className="text-sm text-red-400 mt-1">{errors.password}</p>}
        </div>

        {/* Remember Me / Forgot */}
        <div className="flex justify-between items-center text-sm text-gray-400">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2 rounded bg-black border-red-700 text-red-500 focus:ring-red-500"
            />
            Remember me
          </label>
          <button type="button" className="hover:text-red-300">
            Forgot Password?
          </button>
        </div>

        {/* Sign In */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 transition"
        >
          Sign&nbsp;In&nbsp;to&nbsp;Dashboard
        </button>

        {/* 🔽 Demo Credentials Button Below */}
        <button
          type="button"
          onClick={async () => {
            const demoData = {
              email: 'admin@sparkle.com',
              password: 'Admin@123',
            };
            setFormData(demoData);
            setTimeout(async () => {
              const ok = await login(demoData.email, demoData.password);
              if (ok) navigate('/admin');
              else setErrors((prev) => ({ ...prev, password: 'Invalid email or password' }));
            }, 0);
          }}
          className="mt-4 w-full py-2 rounded-xl font-semibold text-yellow-400 border border-yellow-500 hover:bg-yellow-500/10 transition"
        >
          Use Demo Credentials
        </button>
      </form>

      {/* Navigation to Register */}
      <div className="mt-8 text-center">
        <div className="h-px bg-gradient-to-r from-transparent via-red-700 to-transparent mb-6" />
        <p className="text-gray-400">
          Don’t have an account?{' '}
          <button
            onClick={() => navigate('/admin-register')}
            className="text-red-400 hover:text-red-300"
          >
            Start your journey
          </button>
        </p>
      </div>
    </div>
  </div>
</div>

      

      {/* ===== Right (Sparkle Showcase) ===== */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12 relative overflow-hidden w-full lg:max-w-xl">
        {/* Background sparkles */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <Sparkles className="absolute top-24 left-24 w-6 h-6 text-yellow-400 animate-pulse" />
          <Star className="absolute top-40 right-32 w-4 h-4 text-red-400 animate-pulse delay-1000" />
          <Gem className="absolute bottom-32 left-20 w-5 h-5 text-pink-400 animate-pulse delay-500" />
          <Crown className="absolute bottom-20 right-20 w-6 h-6 text-yellow-400 animate-pulse delay-1500" />
        </div>

        <div className="relative z-10 text-center max-w-lg">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-12 h-12 text-yellow-400 mr-3 animate-pulse" />
            <h2 className="text-5xl font-extrabold bg-gradient-to-r from-yellow-400 via-red-500 to-red-700 bg-clip-text text-transparent">
              Sparkle
            </h2>
            <Sparkles className="w-12 h-12 text-yellow-400 ml-3 animate-pulse" />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-4">Admin Dashboard</h3>
          <p className="text-gray-300 mb-8">
            Transform your business with our premium admin platform. Manage with elegance,
            analyze with precision, and grow with confidence.
          </p>

          <div className="space-y-4 text-gray-300">
            <div className="flex justify-center space-x-6">
              <div className="flex items-center">
                <Zap className="w-5 h-5 text-yellow-400 mr-2" />
                Lightning Fast
              </div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-red-400 mr-2" />
                Ultra Secure
              </div>
            </div>
            <div className="flex justify-center space-x-6">
              <div className="flex items-center">
                <Crown className="w-5 h-5 text-pink-400 mr-2" />
                Premium Quality
              </div>
              <div className="flex items-center">
                <Gem className="w-5 h-5 text-purple-400 mr-2" />
                Luxury Experience
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-yellow-500/10 via-red-600/10 to-red-800/10 rounded-2xl border border-yellow-600/20">
            <p className="text-yellow-300 font-medium mb-2">✨ Sparkle Promise</p>
            <p className="text-gray-400 text-sm">
              Every interaction designed to shine, every feature crafted for excellence.
            </p>
          </div>
        </div>
      </div>
 </div>
  );
};

export default LoginAdmin;
