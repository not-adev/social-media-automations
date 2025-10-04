"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Suspense } from 'react'
import useSWR from 'swr'
import SkeletonCard from '@/app/components/SkeltonCard'
import { useSecureFetcher } from '@/helper/FetcherGet'
import SocialAccounts from '@/app/components/SocialAccounts'
import axios from 'axios'
import AddAccount from '@/app/components/AddAccount'

const Dashbored_Home = () => {
  const fetcher = useSecureFetcher()
  const [AddAccountVisible, setAddAccountVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
   const [SocialAccountdata, setSocialAccountdata] = useState([])
   const [loadingforchild, setLoadingforchild] = useState(true)
     
  useEffect(() => {
    async function addToken() {
      try {
        setIsLoading(true)
        console.log("calling api ")
        const res = await axios.get('/api/SyncUser')
        console.log(res.data)
        const res2 = await axios.get('/api/GetSocialAccounts')
        console.log(res2.data.data)

        setSocialAccountdata(res2.data.data)


      } catch (error) {

      }
      finally {
        console.log("api ed ")
        setIsLoading(false)
        setLoadingforchild(false)
      }
    }
    addToken()


  }, [])

  function closeAddAccount() {
    setAddAccountVisible(false)
  }

  return (
    <>

      <div className="p-10">
        <h1 className="text-4xl font-bold text-center mb-10">
          Your Registered Social Media Accounts
        </h1>
        {
          isLoading ? <SkeletonCard /> :


            <Suspense fallback={<SkeletonCard />}>
              <SocialAccounts  data={SocialAccountdata} loading={loadingforchild} />
            </Suspense>
        }
        <button onClick={() => setAddAccountVisible(true)} className="bg-blue-600 my-7 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow">
          Add New Account
        </button>
        {AddAccountVisible &&
          <AddAccount close={closeAddAccount} />
        }



      </div>

    </>
  );

}

export default Dashbored_Home