"use client"
import React, { useEffect } from 'react'
import { useState } from 'react';
import TwitterGeneratePost from './twitterInputFields/TwitterGeneratePost';

const SelectPlatfrom = ({ close, type }) => {
    const [choosenplatfrom, setChoosenplatfrom] = useState('')

    const platforms = [
        { value: '', label: 'Choose a platform' },
        { value: 'twitter', label: 'Twitter' },
        { value: 'facebook', label: 'Facebook' },
        { value: 'instagram', label: 'Instagram' },
        { value: 'linkedin', label: 'LinkedIn' },
    ];

    return (
        <div className="fixed inset-0 z-50 bg-black/50 bg-opacity-70 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-2xl p-8 min-w-[300px] flex flex-col items-center relative">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                    onClick={() => close()}
                    aria-label="Close"
                >
                    &times;
                </button>
                <h2 className="text-xl font-bold mb-6 text-gray-800">Select Social Media Platform</h2>
                <select 
                value={choosenplatfrom}
                onChange={(e) => setChoosenplatfrom(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 mb-4">
                    <option value="twitter">twitter</option>
                    <option value="facebook">facebook</option>
                    <option value="instagram">instagram</option>
                    <option value="linkedin">linkedin</option>

                </select>
            <TwitterGeneratePost />
            </div>
            {
              type === 'generatepost' &&  choosenplatfrom === "twitter"  &&  <TwitterGeneratePost />
            }


        </div>
    );
}

export default SelectPlatfrom