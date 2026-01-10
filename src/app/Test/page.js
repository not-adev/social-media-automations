'use client'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'


const Page = () => {
    useEffect(() => {
      async function fetchData() {
       
          const response = await axios('/api/GetAllScheduledPost');
          console.log(response.data);
          
      }
      fetchData();
        
    }, [])
    
  return (
    <div>page</div>
  )
}

export default Page