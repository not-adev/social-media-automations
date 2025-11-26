"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import SchedulePostDialogbox from '../SchedulePostDialogbox'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import SkeletonCard from '../SkeltonCard'
const TwitterTrending = ({ account }) => {

    const [choosed, setChoosed] = useState(false)
    const [loadingTopics, setLoadingTopics] = useState(false)
    const [loading, setLoading] = useState(false)
    const successToast = (e) => toast.success(e)
    const [choosenTopic, setchoosenTopic] = useState(null)
    const [Topics, setTopics] = useState([])
    const errorTost = (e) => toast.error(e)
    const [postContent, setPostContent] = useState({ content: '' })
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {

        async function GetTrendingTopic() {
            const date = new Date()
            const trending = await CallAi(`find 12 trending topics on twitter on which i can make post of date ${date} `, 'provide topics heading only ' ,setLoadingTopics)
            const array = trending.split('#')
            array.shift()
            setTopics(array)

            console.log(array)
        }
        GetTrendingTopic()

    }, [])

    function onClose(e) {
        setIsOpen(false)
        // setchoosenTopic()

    }

    function handleChange2(e) {
        const { name, value } = e.target;
        setPostContent(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function handleClick(index) {
        setChoosed(true)
        setchoosenTopic(index)
        console.log(index)
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
              
                setPostContent(
                    {
                        content: '',

                    }
                )
                return


            } catch (error) {
                console.error(error)
                errorTost("unexpected error try again later ")
             
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

   
    async function TwitterGeneratePost() {
        const res = await CallAi(Topics[choosenTopic], 'based on the given topic genrate a twiiter post for me in less then 280 character ' , setLoading)
        setPostContent({ content: res })
    }


    async function CallAi(propmt, myprompt,loadingFuntinn) {
        try {
            loadingFuntinn(true)
            const res = await axios.post('/api/callApi', {
                prompt: `${propmt} ${myprompt}`
            })
            const apiResultTrimmed = removeChar(res.data.result, '"')

            return apiResultTrimmed

        } catch (error) {
            errorTost('Ai not working now please try again later ')
        } finally {
            loadingFuntinn(false)
        }
        // // const res = await axios.get('/api/Facebook/login')
        // // console.log(res)
        // window.location.href = '/api/Facebook/login' 
        // const res = await axios.get('/api/Facebook/GetFacebookId')

    }
    return (
        <>
            <SchedulePostDialogbox isOpen={isOpen} onClose={onClose} onConfirm={onConfirm} />
            <h2 className='m-3 text-xl font-bold'>Choose one of the trendig Topics </h2>

            {
                loadingTopics ? <SkeletonCard /> :
                    (<div className="  flex items-center justify-center ">
                        {/* Grid container */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full overflow-auto max-w-4xl">
                            {Topics.map((text, index) => (
                                <div
                                    onClick={() => handleClick(index)}
                                    key={index}
                                    className={`bg-gray-700 text-white flex items-center w-auto overflow-auto justify-center p-2 h-32 rounded-lg shadow-lg ${choosenTopic == index ? 'border-white border' : null}`}
                                >
                                    {text}
                                </div>
                            ))}
                        </div>
                    </div>)
            }

            <button disabled={!choosed} onClick={() => TwitterGeneratePost()} className={`w-full  mt-5 sm:w-auto bg-blue-700 hover:bg-blue-900 text-white font-bold py-2  px-5 rounded-full shadow transition-all duration-300`}> Generate Post </button>


            {
                postContent.content.length < 1 ? null
                    : !loading ?


                        // < TwitterPostUI socialAccount={account} post={postContent} />
                        <div className='flex p-2 rounded-2xl px-4 gap-2 bg-white w-[100%] mt-5   text-black items-start'>
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

            <button onClick={() => setIsOpen(true)} className={`w-full  mt-5 sm:w-auto bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 ${postContent.content.length < 1 ? 'hidden' : null} px-5 rounded-full shadow transition-all duration-300`}> Post </button>
        </>
    )
}

export default TwitterTrending