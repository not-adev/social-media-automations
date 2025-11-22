"use client"
import React, { useState } from 'react'
import TwitterPostUI from '@/app/components/twitterInputFields/TwitterPostUI'
import SkeletonCard from '@/app/components/SkeltonCard'

const page = () => {
  const [allPosts, setAllPosts] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const response = await axios('/api/GetAllScheduledPost');
        console.log(response.data.allAccounts);
        setAllPosts(response.data.allAccounts)

      } catch (error) {

      } finally {
        setLoading(false)
      }

    }
    fetchData();

  }, [])
  if (loading){
    return <SkeletonCard/>
  }
  return (
   

    <div  
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4"
      >
           {

      allPosts.map((socialAccount) => {
        if (socialAccount.platform == 'twitter') {
          socialAccount.posts.map((post) => {
            return (
              <div className=''>

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
      })

    }

    </div>
  )
}

export default page