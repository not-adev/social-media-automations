'use client'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import AlltwitterAccounts from '@/app/components/twitterInputFields/AlltwitterAccounts'

const page = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const items = [
    { text: "Twitter", image: "https://i.pinimg.com/736x/f6/68/90/f66890653a1275aa5b742387233f4243.jpg" },
    { text: "Instagram", image: "https://i.pinimg.com/736x/28/7f/63/287f632cdf5845eb8e692cc90c1e7dca.jpg" },
    { text: "Facebook", image: "https://i.pinimg.com/736x/e7/c1/54/e7c15488d7a9ef341d79bbe19c5bac30.jpg" },
    { text: "Linded In", image: "http://i.pinimg.com/1200x/b0/28/c2/b028c2e59043116dfc0da6ec6fd26d70.jpg" },
  ];


  const [choosenplatfrom, setChoosenplatfrom] = useState('')
  // useEffect(() => {


  //   console.log(choosenplatfrom);

  // }, [choosenplatfrom])

  return (
    <div className="w-full rounded-xl  p-4 max-h-screen boxsize overflow-auto scrollbar-hidden">
      <div>
        <label className="block text-gray-200 font-semibold mb-1 text-sm sm:text-base">
          Select Social Media Platform
        </label>
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 p-4">
          {items.map((item, index) => (
            <div
              onClick={()=>setChoosenplatfrom(item.text.toLowerCase())}
              key={index}
              className="relative h-64 rounded-lg overflow-hidden bg-cover bg-center shadow-md"
              style={{
                backgroundImage: `url(${item.image})`,

                backgroundColor:'black',
                opacity: choosenplatfrom === item.text.toLowerCase() ? '1' : '0.9',

                border: choosenplatfrom === item.text.toLowerCase() ? '4px solid #ffffff' : 'none',
                cursor: 'pointer'
              }}
            >
              <div className="absolute bottom-0 w-full bg-black/50 bg-opacity-50 text-white text-sm p-2 text-center">
                {item.text}
              </div>
            </div>
          ))}
        </div>
      </div>
   

      {
        choosenplatfrom === 'twitter' && <AlltwitterAccounts  type={type}/>
      }
      
    
    </div>

  )

}

export default page