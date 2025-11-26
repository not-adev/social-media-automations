"use client"
import React, { useEffect, useState } from 'react'
import TwitterPostUI from './TwitterPostUI'
import axios from 'axios'
import { toast } from 'react-toastify'
import SchedulePostDialogbox from '../SchedulePostDialogbox'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
const TwitterSmartAi = ({ account }) => {

    const [inputFromUser, setinputFromUser] = useState('');
    const [loading, setLoading] = useState(false)
    const successToast = (e) => toast.success(e)
    const errorTost = (e) => toast.error(e)
    const [postContent, setPostContent] = useState({ content: '' })
    const [isOpen, setIsOpen] = useState(false)
    const handleChange = (e) => {
        setinputFromUser(e.target.value);
    };

    useEffect(() => {
      console.log(postContent.content.length)
    
     
    }, [postContent.content])
    
    function onClose() {
        setIsOpen(false)

    }

    function handleChange2(e) {
        const { name, value } = e.target;
        setPostContent(prev => ({
            ...prev,
            [name]: value
        }));
    }




    async function onConfirm(data) {
        if (data == 'now') {

            try {

                const response = await axios.post(`/api/twitter/post?socialAccountId=${account._id}`, { formData: postContent, localPath: null })
                axios.post('/api/SchedulePost', {
                    platform: 'twitter',
                    user_id: account.user,
                    content: postContent.content,
                    scheduled_time: new Date(),
                    post_id: response.data.data.id,
                    state: 'posted',
                    socialAccountID: account._id
                }).then((res) => {
                    res.status === 200 ? successToast('new scheduled post made') : errorTost('error in createing new post')
                })
                console.log(response.data);
                setinputFromUser('')
                setPostContent(
                    {
                        content: '',

                    }
                )

                successToast('Post have been made succesfully ')
                return
            } catch (error) {
                console.error(error)
                errorTost("unexpected error try again later ")
                setinputFromUser('')
                setPostContent(
                    {
                        content: '',

                    }
                )
            }



        }
        else {
            try {
                const dataNew = {
                    content: postContent.content,
                    user_id: account.user,
                    platform: 'twitter',
                    scheduled_time: data,
                    socialAccountID: account._id
                }
                const scheduling_post = await axios.post(`/api/SchedulePost`, dataNew)

                successToast("Post have been scheduled ")
                setinputFromUser('')
                setPostContent(
                    {
                        content: '',

                    }
                )
                return


            } catch (error) {
                console.error(error)
                errorTost("unexpected error try again later ")
                setinputFromUser('')
                setForm(
                    {
                        content: '',

                    }

                )

            }


        }


    }

    function removeChar(str, char) {
        const regex = new RegExp(char, "g");
        return str.replace(regex, "");
    }


    async function CallAi(propmt) {
        try {
            setLoading(true)
            const res = await axios.post('/api/callApi', {
                prompt: `${propmt} based on this creaet a post for my twiiter accont smaller then 280 characters  and just give me `
            })
            const apiResultTrimmed = removeChar(res.data.result, '"')
            setPostContent({ content: apiResultTrimmed })
            console.log(res.data.result)
        } catch (error) {
            errorTost('Ai not working now please try again later ')
        } finally {
            setLoading(false)
        }
        // // const res = await axios.get('/api/Facebook/login')
        // // console.log(res)
        // window.location.href = '/api/Facebook/login' 
        // const res = await axios.get('/api/Facebook/GetFacebookId')

    }
    return (
        <>
            <SchedulePostDialogbox isOpen={isOpen} onClose={onClose} onConfirm={onConfirm} />
            <form onSubmit={(e) => {
                e.preventDefault();
                console.log(inputFromUser)
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
                    placeholder="e.g., I am a beauty influencer provide some tips that help to glow skin "
                    className="border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2"
                />
                <div>

                </div>
                <button type='submit' className="w-full self-start sm:w-auto bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-5 rounded-full shadow transition-all duration-300">Submit</button>

            </form>
            {
                postContent.content.length < 1   ? null 
                :  !loading ?

                 
                    // < TwitterPostUI socialAccount={account} post={postContent} />
                    <div className='flex p-2 rounded-2xl px-4 gap-2 bg-white w-[100%]  text-black items-start'>
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
                                <div className="sm:col-span-2 text-black h-[200px] max-w-[800px]">

                                    <textarea
                                        name="content"
                                        required
                                        value={postContent.content}
                                        onChange={handleChange2}
                                        className="w-full py-2 h-full rounded-lg focus:outline-none "
                                        rows={3}
                                        placeholder="Write your post content here..."
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
                 : 
                  (<div>

                    <Skeleton height={150} width="100%" />
                </div>)
            }

            <button onClick={() => setIsOpen(true)} className={`w-full  mt-5 sm:w-auto bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 ${ postContent.content.length < 1 ? 'hidden' : null} px-5 rounded-full shadow transition-all duration-300`}> Post </button>
        </>
    )
}

export default TwitterSmartAi