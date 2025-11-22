"use client"
import axios from 'axios';
import SchedulePostDialogbox from '../SchedulePostDialogbox';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const TwitterGeneratePost = ({ account }) => {
  const successToast = (e) => toast.success(e)
  const errorTost = (e) => toast.error(e)
  const [isOpen, setIsOpen] = useState(false)
  const [userInstaData, setUserInstaData] = useState({
    name: null,
    platform: null,
    profilePicture: null,
    user: null,
    username: null,

  })


  const [form, setForm] = useState({
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

  function SchedulePost() {
    if (handleerror()) {
      return
    }

  }
  function onClose() {
    setIsOpen(false)

  }

  async function onConfirm(data) {
    if (data == 'now') {
      let savedFile = null
      if (File) {
        savedFile = await handleFileSave(File)
      }
      try {

        const response = await axios.post(`/api/twitter/post?socialAccountId=${account._id}`, { formData: form, localPath: savedFile })
        axios.post('/api/SchedulePost', {
          platform: 'twitter',
          user_id: account.user,
          content: form.content,
          scheduled_time: new Date(),
          post_id: response.data.data.id,
          state: 'posted',
          socialAccountID: account._id
        }).then((res) => {
          res.status === 200 ? successToast('new scheduled post made') : errorTost('error in createing new post')
        })
        console.log(response.data);
        setForm(
          {
            content: '',
            code: '',
          }
        )

        successToast('Post have been made succesfully ')
        return
      } catch (error) {
        console.error(error)
        errorTost("unexpected error try again later ")
        setForm(
          {
            content: '',
            code: '',
          }
        )
      }



    }
    else {
      try {
        const dataNew = {
          content: form.content,
          user_id: account.user,
          platform: 'twitter',
          scheduled_time: data,
          socialAccountID: account._id
        }
        const scheduling_post = await axios.post(`/api/SchedulePost`, dataNew)

        successToast("Post have been scheduled ")
        setForm(
          {
            content: '',
            code: '',
          }
        )
        return


      } catch (error) {
        console.error(error)
        errorTost("unexpected error try again later ")
        setForm(
          {
            content: '',
            code: '',
          }
        
        )
          setMaxCoutn(0)
      }


    }


  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (handleerror()) return;


    setIsOpen(true)

  }

  return (
    <div className="w-full rounded-xl shadow-lg p-4 max-h-screen">

      <SchedulePostDialogbox isOpen={isOpen} onClose={onClose} onConfirm={onConfirm} />

      <form encType='multipart/form-data' className="grid grid-cols-1 gap-2 text-white" onSubmit={handleSubmit}>
        <div className='flex p-2 rounded-2xl px-4 gap-2 bg-white w-[100%] text-black items-start '>
          <div>
            <img src={account.profilePicture} className='rounded-full' alt="profile imgae " />
          </div>
          <div className='flex-1 '>
            <div>

              <div className='flex items-center justify-between flex-1 gap-6 w-full '>
                <div>
                  {account.name}@{account.username}
                </div>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-dots"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>

                </div>
              </div>

            </div>
            <div className=''>
              <div className="sm:col-span-2 text-black max-w-[800px]">

                <textarea
                  name="content"
                  required
                  value={form.content}
                  onChange={handleChange}
                  className="w-full py-2 rounded-lg focus:outline-none  resize-none"
                  rows={3}
                  placeholder="Write your post content here..."
                />
                <p className={`text-sm ${maxCount > 280 ? 'text-red-500' : 'text-black'}`}>{maxCount}/280</p>
              </div>
              <div className='max-w-[300px]'>
                <label className="block  font-semibold mb-1 text-sm sm:text-base">Image or Video</label>
                <input
                  type="file"
                  name="file"
                  accept="image/*,video/*"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full px-4 py-2 border-2 rounded-lg "
                />
              </div>
            </div>
            <div className='flex my-2.5 justify-between '>
              <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-message-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1" /></svg></div>
              <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-heart"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg></div>
              <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-antenna-bars-4"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 18l0 -3" /><path d="M10 18l0 -6" /><path d="M14 18l0 -9" /><path d="M18 18l0 .01" /></svg></div>
              <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-bookmark"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4z" /></svg></div>
              <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-upload"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 9l5 -5l5 5" /><path d="M12 4l0 12" /></svg></div>
            </div>



          </div>

        </div>

        {/* Preview Button */}
        <div className="sm:col-span-2 flex flex-col sm:flex-row justify-end items-center gap-2 mt-4">
          <button type="submit" className="w-full sm:w-auto bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-5 rounded-full shadow transition-all duration-300">Next</button>

        </div>
      </form>


    </div>
  )
}

export default TwitterGeneratePost