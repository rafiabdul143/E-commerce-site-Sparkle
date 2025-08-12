// This is the RegisterAdmin component with full red-black themed design, extra form inputs, and
// the right sparkle showcase reused from the LoginAdmin layout.

import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  CreditCard,
  FileText,
  Building2,
  MapPin,
  Sparkles,
  Star,
  Zap,
  Crown,
  Gem,
  Shield,
} from 'lucide-react';

const RegisterAdmin = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    aadharNumber: '',
    panNumber: '',
    businessName: '',
    address: '',
    phone: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add validation logic
    console.log('Register submitted:', formData);
  };

  return (
    <div className="min-h-screen flex flex-col-reverse lg:flex-row bg-gradient-to-br from-black via-zinc-900 to-red-900">
      {/* Left: Form Section */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-16">
        <div className="w-full max-w-3xl bg-black/70 border border-red-700/40 p-10 rounded-3xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 rounded-full shadow-lg">
                <Building2 className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-1">Welcome to the Sparkle Family!</h1>
            <p className="text-red-400 text-lg font-semibold mb-1">We're thrilled to have you onboard 🚀</p>
            <p className="text-gray-400 text-sm">Wishing you the very best on your business journey!</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Full Name" name="fullName" icon={<User />} value={formData.fullName} onChange={handleChange} />
            <InputField label="Email" name="email" icon={<Mail />} value={formData.email} onChange={handleChange} type="email" />
            <PasswordField label="Password" name="password" value={formData.password} onChange={handleChange} show={showPassword} toggle={() => setShowPassword((p) => !p)} />
            <PasswordField label="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} show={showConfirmPassword} toggle={() => setShowConfirmPassword((p) => !p)} />
            <InputField label="Business Name" name="businessName" icon={<Building2 />} value={formData.businessName} onChange={handleChange} />
            <InputField label="Phone Number" name="phone" icon={<CreditCard />} value={formData.phone} onChange={handleChange} type="tel" />
            <InputField label="Aadhar Number" name="aadharNumber" icon={<CreditCard />} value={formData.aadharNumber} onChange={handleChange} />
            <InputField label="PAN Number" name="panNumber" icon={<FileText />} value={formData.panNumber} onChange={handleChange} />
            <div className="md:col-span-2">
              <InputField label="Business Address" name="address" icon={<MapPin />} value={formData.address} onChange={handleChange} />
            </div>

            <div className="md:col-span-2 flex items-center">
              <input type="checkbox" id="terms" className="mr-2" required />
              <label htmlFor="terms" className="text-gray-400 text-sm">
                I agree to the <span className="text-red-400 cursor-pointer">Terms of Service</span> &{' '}
                <span className="text-red-400 cursor-pointer">Privacy Policy</span>
              </label>
            </div>

            <div className="md:col-span-2">
              <button type="submit" className="w-full py-4 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold rounded-xl hover:from-red-700 hover:to-red-900 transition-transform transform hover:scale-[1.02] shadow-lg uppercase tracking-wider">
                Create Admin Account
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Already a member?{' '}
              <button onClick={onSwitchToLogin} className="text-red-400 hover:text-red-300 font-semibold">
                Login here
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right: Showcase Section */}
      <div className="flex flex-col items-center justify-center p-8 lg:p-16 relative overflow-hidden w-full lg:max-w-xl">
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

// Reusable Input Field Component
const InputField = ({ label, name, value, onChange, icon, type = 'text' }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">
      {label}
    </label>
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5">
        {icon}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`Enter ${label.toLowerCase()}`}
        className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-900/50 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:border-red-500 focus:bg-gray-900/70"
      />
    </div>
  </div>
);

// Reusable Password Field
const PasswordField = ({ label, name, value, onChange, show, toggle }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">
      {label}
    </label>
    <div className="relative">
      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
      <input
        type={show ? 'text' : 'password'}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        className="w-full pl-12 pr-12 py-3 rounded-lg bg-gray-900/50 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:border-red-500 focus:bg-gray-900/70"
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-400"
      >
        {show ? <EyeOff /> : <Eye />}
      </button>
    </div>
  </div>
);

export default RegisterAdmin;
