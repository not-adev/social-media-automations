import React, { useState } from 'react'
import TwitterGeneratePost from './TwitterGeneratePost'
import TwitterSmartAi from './TwitterSmartAi'
import TwitterTrending from './Twittertrending'

const AlltwitterAccounts = ({type}) => {
  const SocialAccounts = JSON.parse(localStorage.getItem('socialAccounts')) || []
  const twitterAccount = SocialAccounts.filter(item => item.platform === 'twitter') || []
  const [selectedAccount, setSelectedAccount] = useState(null)

  return (
    <>
      <div className="w-full text-center py-6">
        <h2 className="text-2xl font-semibold">Choose an account</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-6 p-6 scrollbar-hidden">
        {twitterAccount.map((account, index) => (
          <div
            key={index}
            onClick={() => setSelectedAccount(account)}
            className={`bg-gray-700 text-white shadow-md rounded-lg p-6 flex flex-col items-center text-center cursor-pointer transition-all duration-200 ${
              selectedAccount?._id === account._id ? 'border-2 border-white scale-105' : ''
            }`}
          >
            <img
              src={account.profilePicture}
              alt={`${account.platform} profile`}
              className="w-24 h-24 rounded-full mb-4 object-cover"
            />
            <h2 className="text-xl font-semibold">{account.username}</h2>
            <p className="text-sm text-gray-400">{account.platform}</p>
          </div>
        ))}
      </div>

      {selectedAccount && type == "generatepost" && (
        <div className="mt-6">
          <TwitterGeneratePost account={selectedAccount} />
        </div>
      )}
       {selectedAccount && type == "smartai" && (
        <div className="mt-6">
          <TwitterSmartAi  account={selectedAccount} />
        </div>
      )}
      {selectedAccount && type == "tredingtopics" && (
        <div className="mt-6">
          <TwitterTrending  account={selectedAccount} />
        </div>
      )}
    </>
  )
}

export default AlltwitterAccounts