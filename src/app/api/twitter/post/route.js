import axios from 'axios';
import { NextResponse, NextRequest } from 'next/server';
import { getId } from '@/helper/getId';
import Usermodel from '@/modles/Usermodel';
import SocailMediaAccountModel from '@/modles/SocailMediaAccountModel';
import connectDB from '@/helper/ConnectDB';
export async function POST(request) {
  console.log('twiter post hit ')
  
  await connectDB()
  const socialAccountId = request.nextUrl.searchParams.get('socialAccountId');
  const socailAccount = await SocailMediaAccountModel.findById(socialAccountId);
  console.log(socailAccount , 'my social account ')
  const tokenCreatedAt = new Date(socailAccount.token_created_at).getTime()
  console.log(tokenCreatedAt , 'token created at')
  let accessToken = socailAccount.access_token
  const expery = socailAccount.expires_in
  console.log(Date.now() > tokenCreatedAt + expery * 1000 , "false or not ")
  if (Date.now() > tokenCreatedAt + expery * 1000) {
    const res = await axios.get(`${process.env.HOST}/api/twitter/refreshtoken?socialAccountId=${socialAccountId}`)
    accessToken = res.data.user.access_token
  }
  const reqbody = await request.json()
  const { formData, localPath } = reqbody
  console.log(localPath, formData)
  // if (localPath) {
  //   const media = await UploadImageOnTwiter(localPath, accessToken)
  //   const tweetRes = await axios.post(
  //     "https://api.twitter.com/2/tweets",
  //     {
  //       text: formData.content,
  //       media: { media_ids: [media] },
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   DeleteFileFromDisk(localPath)
  //   return NextResponse.json({ message: 'upload Succefull', tweet: tweetRes.data })

  // }
  const tweetRes = await axios.post(
    "https://api.twitter.com/2/tweets",
    {
      text: formData.content,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  // DeleteFileFromDisk(localPath)
  console.log(tweetRes.data)

  return NextResponse.json({ message: 'Post scheduled successfully' , data : tweetRes.data });
};