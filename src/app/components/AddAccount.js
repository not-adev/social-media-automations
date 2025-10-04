"use client"
import axios from 'axios';
import React, { useState } from 'react';

const AddAccount = ({ close }) => {
  const [selectedPlatform, setSelectedPlatform] = useState('');


  const handleLogin = async () => {
    if (!selectedPlatform) return alert('Please select a platform');
    console.log(`Logging in to ${selectedPlatform}`);
    window.location.href = `/api/${selectedPlatform.toLowerCase()}/login`;

  };



  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,.7)] flex items-center justify-center z-50">
      <div className="relative bg-gray-900 text-white rounded-lg shadow-xl p-6 w-full max-w-sm space-y-5 border border-gray-700">

        {/* Close Button */}
        <button
          onClick={() => close()}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl font-bold focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-center">Connect Your Account</h2>

        <select
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value)}
          className="w-full bg-gray-800 border border-gray-600 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Choose Platform --</option>
          <option value="Twitter">Twitter</option>

        </select>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition duration-200"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AddAccount;