'use client'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'


const page = () => {
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

export default page