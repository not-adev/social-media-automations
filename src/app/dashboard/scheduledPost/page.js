"use client"
import React,{useState} from 'react'

const page = () => {
  const [AllScheduledPosts, setAllScheduledPosts] = useState([])
  useEffect(() => {
    async function fetchData() {

      const response = await axios('/api/GetAllScheduledPost');
      console.log(response.data);
      setAllScheduledPosts(response.data)

    }
    fetchData();

  }, [])
  const socialAccounts = JSON.parse(localStorage.getItem('socialAccouts'))
  return (
    AllScheduledPosts.map((post) => {
      if (post.platform == 'twitter') {
        return (
          <div> 
            twiiter
          </div>
        )
      }
    })
  )
}

export default page