import { NextResponse } from 'next/server';
import { currentUser, auth } from '@clerk/nextjs/server';
import Usermodel from '@/modles/Usermodel';
import connectDB from '@/helper/ConnectDB';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  await connectDB();
  const { isAuthenticated } = await auth()
  if (!isAuthenticated) {
    return new NextResponse('Unauthorized', { status: 401 })
  }
  const userFromClerk = await currentUser()
  let user = await Usermodel.findOne({ clerkId: userFromClerk.id });

  if (!user) {

    user = await Usermodel.create({
      clerkId: userFromClerk.id,
      email: userFromClerk.emailAddresses[0].emailAddress,
    });
  }
  const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY })
  const res = NextResponse.json({ message: 'User synced successfully' , id : user._id }, { status: 200 });
  res.cookies.set('token', token, {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 2 , // 2 day
  });


  return res 

}
