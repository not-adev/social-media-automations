"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const TwitterGeneratePost = ({ }) => {
  const [form, setForm] = useState({
    datetime: '',
    content: '',
    code: '',
  });
  const [File, setFile] = useState(null)
  const [maxCount, setMaxCoutn] = useState(0)
  function handleerror() {
    if (maxCount > 280) {
      alert("Content exceeds 280 characters limit for Twitter.");
      return true;
    }
  }
  function handleChange(e) {
    const { name, value, type } = e.target;
    if (name === 'content') {
      setMaxCoutn(value.length)
      console.log(maxCount);
    }


    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleCopy() {
    navigator.clipboard.writeText(form.code);
  }




  async function handleFileSave(file) {
    const fileData = new FormData()
    fileData.append('file', file);
    const res = await axios.post("/api/upload", fileData, {
      headers: {
        // ✅ Let the browser set the proper boundary automatically
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.data.localPath)
    return res.data.localPath
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (handleerror()) return;
    let savedFile = null
    if (File) {
      savedFile = await handleFileSave(File)

    }


    const response = await axios.post('/api/twitter/post', { formData: form, localPath: savedFile })
    console.log(response.data);
    // const res = await axios.get('/api/twitter/refreshtoken')
    
  }

  return (
    <div className="w-full rounded-xl shadow-lg p-4 max-h-screen">
      <form encType='multipart/form-data' className="grid grid-cols-1 gap-2 text-white" onSubmit={handleSubmit}>
        {/* Date-Time Input */}
        <div className='max-w-[300px]'>
          <label className="block text-gray-200 font-semibold mb-1 text-sm sm:text-base">Schedule Date & Time</label>
          <input
            type="datetime-local"
            required
            name="datetime"
            value={form.datetime}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-700 bg-gray-900 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
          />
        </div>

        {/* Content Textarea */}
        <div className="sm:col-span-2 max-w-[800px]">
          <label className="block text-gray-200 font-semibold mb-1 text-sm sm:text-base">Content</label>
          <textarea
            name="content"
            required
            value={form.content}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-700 bg-gray-900 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 resize-none"
            rows={3}
            placeholder="Write your post content here..."
          />
          <p className={`text-sm ${maxCount > 280 ? 'text-red-500' : 'text-gray-400'}`}>{maxCount}/280</p>
        </div>

        {/* File Input for Image/Video */}
        <div className='max-w-[300px]'>
          <label className="block text-gray-200 font-semibold mb-1 text-sm sm:text-base">Image or Video</label>
          <input
            type="file"
            name="file"
            accept="image/*,video/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full px-4 py-2 border-2 border-gray-700 bg-gray-900 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
          />
        </div>

        {/* Code Field with Copy Button */}
        {/* <div className="flex flex-col sm:col-span-2 max-w-[300px]">
          <label className="block text-gray-200 font-semibold mb-1 text-sm sm:text-base">Generated Code</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              required
              name="code"
              value={form.code}
              readOnly
              className="w-full px-4 py-2 border-2 border-gray-700 bg-gray-900 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
            <button type="button" className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded transition-all duration-300" onClick={handleCopy}>Copy</button>
          </div>
        </div> */}

        {/* Preview Button */}
        <div className="sm:col-span-2 flex flex-col sm:flex-row justify-end items-center gap-2 mt-4">
          <button type="submit" className="w-full sm:w-auto bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-5 rounded-full shadow transition-all duration-300">Preview</button>

        </div>
      </form>
    </div>
  )
}

export default TwitterGeneratePost