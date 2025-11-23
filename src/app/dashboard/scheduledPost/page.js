"use client"
import React, { useState, useEffect } from 'react'
import TwitterPostUI from '@/app/components/twitterInputFields/TwitterPostUI'
import SkeletonCard from '@/app/components/SkeltonCard'
import axios from 'axios'
const page = () => {
  const [allPosts, setAllPosts] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {

    async function fetchData() {
      console.log("fetch called ")
      try {
        setLoading(true)
        const response = await axios.get('/api/GetAllScheduledPost');
        console.log("api called ended ")
        console.log(response.data.allAccounts);
        setAllPosts(response.data.allAccounts)

      } catch (error) {

      } finally {
        setLoading(false)
      }

    }
    fetchData();

  }, [])

  // if (loading) {

  //   return (

  //     <div className='min-h-screen overflow-auto'>
  //       hi 
  //       <SkeletonCard />
  //     </div>

  //   )
  // }
  return (


    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 "
    >
      {
        allPosts.length > 0 ?
          allPosts.map((socialAccount) => {
            if (socialAccount.platform == 'twitter') {
             return socialAccount.posts.map((post,index) => {
                return (
                  <div key={index} className='bg-yellow-400 h-[500px]'>
                      
                    <TwitterPostUI post={post} socialAccount={socialAccount} />
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
          )
          : 'no post made yet '

      }

    </div>
  )
}

export default page