import React, { useEffect, useState } from 'react'
import useSWR from 'swr';
import { useSecureFetcher } from '@/helper/FetcherGet';
import SkeletonCard from '@/app/components/SkeltonCard'
import axios from 'axios';
const SocialAccounts = () => {
    const fetcher = useSecureFetcher()
    const [SocialAccounts, setSocialAccounts] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function GetSocialAccounts() {
            try {
                setLoading(true)
                const res = await axios.get('/api/GetSocialAccounts')
                console.log(res.data.data)

                setSocialAccounts(res.data.data)

            } catch (error) {
                console.log("eror")

            }
            finally {
                setLoading(false)
            }
        }
        GetSocialAccounts()
    }, [])

    const accounts = [
        {
            username: '@md_creator',
            platform: 'Facebook',
            image: 'https://i.pinimg.com/736x/24/e2/5b/24e25b8940aa30d61de6c6c1cd3a6804.jpg',
        },
        {
            username: '@md_snap',
            platform: 'Instagram',
            image: 'https://i.pinimg.com/736x/24/e2/5b/24e25b8940aa30d61de6c6c1cd3a6804.jpg',
        },
        {
            username: '@md_voice',
            platform: 'Twitter',
            image: 'https://i.pinimg.com/736x/24/e2/5b/24e25b8940aa30d61de6c6c1cd3a6804.jpg',
        },
    ];
    if (loading) {
        return <SkeletonCard />
    }

    return (
        <>
            {
                loading ? <SkeletonCard /> : (


                    SocialAccounts.length <= 0 ?
                        (<div>
                            No Registered Social media accounts yet
                        </div>) :

                        <div className="grid grid-cols-1 md:grid-cols-3  gap-8">
                            {SocialAccounts.map((account, index) => (
                                <div
                                    key={index}
                                    className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center"
                                >
                                    <img
                                        src={account.image}
                                        alt={`${account.platform} profile`}
                                        className="w-24 h-24 rounded-full mb-4 object-cover"
                                    />
                                    <h2 className="text-xl text-black font-semibold">{account.username}</h2>
                                    <p className="text-gray-500">{account.platform}</p>
                                </div>
                            ))}
                        </div>)
            }

        </>
    )
}

export default SocialAccounts