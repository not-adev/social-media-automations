import axios from 'axios';
import { UploadImageOnTwiter } from '@/helper/uploadImageOnTwitter';
import { DeleteFileFromDisk } from '@/helper/deleteFileFromDisk';
import { NextResponse, NextRequest } from 'next/server';
import { getId } from '@/helper/getId';
import Usermodel from '@/modles/Usermodel';
import connectDB from '@/helper/ConnectDB';
export async function POST(req) {
  console.log('twiter post hit ')
  await connectDB()
  const token = req.cookies.get('token')?.value || '';
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const id = await getId(token);
  const user = await Usermodel.findById(id);
  const tokenCreatedAt = new Date(user.token_created_at).getTime();
  let accessToken = user.access_token
  const expery = user.expires_in
  if (Date.now() > tokenCreatedAt + expery * 1000) {
    const res = await axios.get(`${process.env.HOST}/api/twitter/refreshtoken`)
    accessToken = res.data.user.access_token
  }
  const reqbody = await req.json()
  const { formData, localPath } = reqbody
  console.log(localPath, formData)
  if (localPath) {
    const media = await UploadImageOnTwiter(localPath, accessToken)
    const tweetRes = await axios.post(
      "https://api.twitter.com/2/tweets",
      {
        text: formData.content,
        media: { media_ids: [media] },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    DeleteFileFromDisk(localPath)
    return NextResponse.json({ message: 'upload Succefull', tweet: tweetRes.data })

  }
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
  DeleteFileFromDisk(localPath)

  return NextResponse.json({ message: 'Post scheduled successfully' });
};