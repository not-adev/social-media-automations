'use client'
import React,{useState,useEffect} from 'react'
import { useSearchParams} from 'next/navigation'
import TwitterGeneratePost from '@/app/components/twitterInputFields/TwitterGeneratePost';
const page = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  const [choosenplatfrom, setChoosenplatfrom] = useState('')
  useEffect(() => {
    
  
    console.log(choosenplatfrom);
  
  }, [choosenplatfrom])
  
  return (
    <div className="w-full rounded-xl  p-4 max-h-screen">
      <div>
        <label className="block text-gray-200 font-semibold mb-1 text-sm sm:text-base">
          Select Social Media Platform
        </label>
        <select
          value={choosenplatfrom}
          onChange={(e) => setChoosenplatfrom(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border-2 max-w-[300px] focus:outline-none focus:ring-2 focus:ring-blue-700 text-gray-200 bg-black mb-2">
          <option value="">Select platform</option>
          <option value="twitter">Twitter</option>
          <option value="facebook">Facebook</option>
          <option value="instagram">Instagram</option>
          <option value="linkedin">LinkedIn</option>
        </select>
      </div>
      {
        choosenplatfrom === 'twitter' && <TwitterGeneratePost/>
      }
    </div>

  )

}

export default page