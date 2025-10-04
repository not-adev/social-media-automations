import React, { useState } from 'react'
import SkeletonCard from '@/app/components/SkeltonCard'

const SocialAccounts = ({ data = [],loading }) => {

    return (
        <>
            {
                loading ? <SkeletonCard /> : (


                    data.length <= 0 ?
                        (<div>
                            No Registered Social media accounts yet
                        </div>) :

                        <div className="grid grid-cols-1 md:grid-cols-3  gap-8">
                            {data.map((account, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 text-white shadow-md rounded-lg p-6 flex flex-col items-center text-center"
                                >
                                    <img
                                        src={account.profilePicture}
                                        alt={`${account.platform} profile`}
                                        className="w-24 h-24 rounded-full mb-4 object-cover"
                                    />
                                    <h2 className="text-xl font-semibold">{account.username}</h2>
                                    <p className="">{account.platform}</p>
                                </div>
                            ))}
                        </div>)
            }

        </>
    )
}

export default SocialAccounts