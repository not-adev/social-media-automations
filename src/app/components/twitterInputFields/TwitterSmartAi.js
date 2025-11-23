"use client"
import React, { useEffect, useState } from 'react'
import TwitterPostUI from './TwitterPostUI'
import axios from 'axios'

const TwitterSmartAi = ({ account }) => {

    const [inputFromUser, setinputFromUser] = useState('');

    const handleChange = (e) => {
        setinputFromUser(e.target.value);
    };


    async function CallAi(propmt) {

        console.log('api hit called ')
        const apiResult = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
            "model": "deepseek/deepseek-r1-0528-qwen3-8b:free",
            "messages": [
                {
                    "role": "user",
                    "content": `${propmt} taking this a refrence generate a twitter post for in less then 280 charector `
                }
            ]
        }, {
            headers: {
                "Authorization": `Bearer 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`,
                "HTTP-Referer": 'http://localhost:3000', // Optional. Site URL for rankings on openrouter.ai.
                "X-Title": "", // Optional. Site title for rankings on openrouter.ai.
                "Content-Type": "application/json"
            }

        })
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            CallAi(inputFromUser);
        }}
            className="flex flex-col gap-2 p-4">

            <label htmlFor="inputFromUser" className="text-sm font-medium ">
                Explain what you want to post:
            </label>
            <input
                type="text"
                id="inputFromUser"
                name="inputFromUser"
                value={inputFromUser}
                required
                onChange={handleChange}
                placeholder="e.g., generate something related to indain healthy diet"
                className="border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2"
            />
            <button type='submit'>Submit</button>

        </form>

        // <div><TwitterPostUI  socialAccount={account}/></div>
    )
}

export default TwitterSmartAi