import React, { useState } from 'react';
import { Phone, ArrowRight } from 'lucide-react';

const PhoneOTP = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: phone, 2: otp
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStep(2);
    setIsLoading(false);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('OTP verified:', otp);
    setIsLoading(false);
  };

  if (step === 1) {
    return (
      <form onSubmit={handleSendOTP} className="space-y-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="phone"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+1 (555) 000-0000"
              required
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 flex items-center justify-center"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              Send OTP
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleVerifyOTP} className="space-y-4">
      <div>
        <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
          Enter OTP
        </label>
        <input
          id="otp"
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg tracking-widest"
          placeholder="123456"
          maxLength={6}
          required
        />
        <p className="mt-2 text-sm text-gray-600">
          Code sent to {phoneNumber}
        </p>
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 flex items-center justify-center"
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        ) : (
          <>
            Verify OTP
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </button>
      
      <button
        type="button"
        onClick={() => setStep(1)}
        className="w-full text-sm text-gray-600 hover:text-gray-900"
      >
        ← Change phone number
      </button>
    </form>
  );
};

export default PhoneOTP;
