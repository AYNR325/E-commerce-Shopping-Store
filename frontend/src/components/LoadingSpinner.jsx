import React from 'react';
import wearloLogo from '@/assets/website_name2.png';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center space-y-4">
        {/* Logo or brand */}
        <div className="w-32 h-16 flex items-center justify-center">
          <img src={wearloLogo} alt="Wearlo Logo" className="h-full object-contain" />
        </div>
        
        {/* Spinner */}
        <div className="relative">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[#A67A4B] rounded-full animate-spin"></div>
        </div>
        
        {/* Loading text */}
        <div className="text-center">
          <p className="text-gray-600 font-medium">Loading...</p>
          <p className="text-sm text-gray-400 mt-1">Please wait while we prepare your experience</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 