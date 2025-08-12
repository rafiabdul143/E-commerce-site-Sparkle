import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import ImageCollage from './ImageCollage';
import PhoneOTP from './PhoneOTP';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSampleCredentials, setShowSampleCredentials] = useState(true);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  /* ---------- redirect if already logged in ---------- */
  if (isAuthenticated) return <Navigate to="/profile" replace />;

  /* ---------- handlers ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    /* trim / normalise before sending */
    const ok = await login(email.trim().toLowerCase(), password.trim());

    setIsLoading(false);
    if (ok) {
      navigate('/profile');
    } else {
      setError('Invalid email or password');
    }
  };

  const fillSampleCredentials = () => {
    setEmail('demo@fashion.com');
    setPassword('demo123');
    setShowSampleCredentials(false);
  };

  /* ---------- UI ---------- */
  return (
    <div className="min-h-screen flex flex-col bg-red-800 lg:flex-row bg-gradient-to-br from-slate-50 to-blue-50">
      {/* ---------- FORM (mobile‑first) ---------- */}
      <div className="w-full lg:w-1/2 order-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
           
              <h1 className="text-2xl font-bold text-gray-900 ml-2">
                  
              </h1>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome&nbsp;Back
            </h2>
            <p className="text-gray-600">Sign in to continue your journey</p>
          </div>

          {/* demo banner */}
          {showSampleCredentials && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    Demo account
                  </p>
                  <p className="text-xs text-blue-700">
                    demo@fashion.com / demo123
                  </p>
                </div>
                <button
                  onClick={fillSampleCredentials}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Use
                </button>
              </div>
            </div>
          )}

          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
            </div>

            {/* submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              ) : (
                <>
                  Sign&nbsp;In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>

            {/* divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>

            {/* otp toggle */}
            {!showOtpForm ? (
              <button
                type="button"
                onClick={() => setShowOtpForm(true)}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200"
              >
                Continue with Phone&nbsp;OTP
              </button>
            ) : (
              <div className="space-y-4">
                <PhoneOTP />
                <button
                  type="button"
                  onClick={() => setShowOtpForm(false)}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  ← Back to email login
                </button>
              </div>
            )}
          </form>

          {/* register prompt */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* ---------- IMAGE COLLAGE (mobile below, desktop right) ---------- */}
     {/* RIGHT SECTION -------------------------------------------------- */}
<div className="w-full lg:w-1/2 relative order-2 overflow-hidden">
  <ImageCollage />

  {/* blue tint overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-blue-700/25 to-transparent backdrop-blur-sm z-10" />

  {/* call‑to‑action text */}
  <div className="absolute bottom-10 left-6 lg:left-10 right-6 z-20 text-white text-center lg:text-left">
    
    
  </div>
  
</div>

    </div>
  );
};

export default Login;
