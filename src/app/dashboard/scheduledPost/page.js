"use client"
import React, { useState, useEffect } from 'react'
import TwitterPostUI from '@/app/components/twitterInputFields/TwitterPostUI'
import SkeletonCard from '@/app/components/SkeltonCard'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
const Page = () => {
  const [allPosts, setAllPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const erroToast = (msg) => toast.error(msg)
  useEffect(() => {

    async function fetchData() {
      // console.log("fetch called ")
      try {
        setLoading(true)
        const response = await axios.get('/api/GetAllScheduledPost');
        // console.log("api called ended ")
        // console.log(response.data.allAccounts);
        setAllPosts(response.data.allAccounts)

      } catch (error) {
        erroToast('Cant Load Posts')
      } finally {
        setLoading(false)
      }

    }
    fetchData();

  }, [])

  return (
    <div>
      {
        allPosts.length > 0 ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 overflow-auto max-h-screen scrollbar-hidden md:grid-cols-3 gap-16 p-4 items-stretch "
          >
            {
              allPosts.map((socialAccount) => {
                if (socialAccount.platform == 'twitter') {
                  return socialAccount.posts.map((post, index) => {
                    console.log(post)
                    return (
                      <div key={index} className='  h-[100%]'>

                        <div className='flex p-2 rounded-2xl px-4 gap-2 bg-white w-[100%] h-[100%] text-black items-start '>
                          <div>
                            <img src={socialAccount.profilePicture} className='rounded-full' alt="profile imgae " />
                          </div>
                          <div className='flex-1 '>
                            <div>

                              <div className='flex items-center justify-between flex-1 gap-6 w-full '>
                                <div>
                                  {socialAccount.name}@{socialAccount.username}
                                </div>
                                <div>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-dots"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>

                                </div>
                              </div>

                            </div>
                            <div className=''>
                              <div className="sm:col-span-2 text-black max-w-[800px]">

                                <div className="w-full py-2 rounded-lg focus:outline-none  resize-none">
                                  {post.content}
                                </div>
                              </div>

                            </div>
                            <div className='flex my-2.5 justify-between items-baseline'>
                              <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-message-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1" /></svg></div>
                              <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-heart"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg></div>
                              <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-antenna-bars-4"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 18l0 -3" /><path d="M10 18l0 -6" /><path d="M14 18l0 -9" /><path d="M18 18l0 .01" /></svg></div>
                              <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-bookmark"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4z" /></svg></div>
                              <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-upload"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 9l5 -5l5 5" /><path d="M12 4l0 12" /></svg></div>
                            </div>



                          </div>

                        </div>
                        <div className='flex items-center justify-between my-4'>
                          <div>
                            Status
                          </div>
                          <div>
                            {post.state}
                          </div>
                        </div>
                      </div>
                    )

                  })
                }
                else if (socialAccount.platform == 'instagram') {
                  /// insta ui component 
                }
                else if (socialAccount.platform == 'facebook') {
                  /// facebook ui component 
                }
                else if (socialAccount.platform == 'linkedin') {
                  /// linkedin ui commponent 
                }
              }
              )}



            <ToastContainer />
          </div>)
          :
          <div className='h-[100vh] w-full m-0 p-15 flex items-center justify-center '>
            <div className='border-6 border-gray-700 h-[80%] w-[80%] flex flex-col items-center justify-center'>
              <div className='text-5xl font-bold text-gray-500'>
                Not Found
                </div>
                <div className='text-gray-500'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="74" height="74" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler  icons-tabler-outline icon-tabler-mood-puzzled"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14.986 3.51a9 9 0 1 0 1.514 16.284c2.489 -1.437 4.181 -3.978 4.5 -6.794" /><path d="M10 10h.01" /><path d="M14 8h.01" /><path d="M12 15c1 -1.333 2 -2 3 -2" /><path d="M20 9v.01" /><path d="M20 6a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" /></svg>
              </div>
            </div>
          </div>
      }
    </div>
  )
}

export default Page