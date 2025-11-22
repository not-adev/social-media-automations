import connectDB from "@/helper/ConnectDB";
import Usermodel from "@/modles/Usermodel";
import { NextResponse } from "next/server";
import { getId } from "@/helper/getId";
export async function PUT(req, res) {

  try {
    await connectDB();
    const reqbody =await req.json()
    let { userId,ScheduledPostId } = reqbody;
    // let { ScheduledPostId } = reqbody;

   

    if (!userId) {
      const token = req.cookies.get('token')?.value || ''
      if (!token) {
        return NextResponse.json({ message: "no token" }, { status: 401 })
      }
      userId = await getId(token)
    }
    if(!ScheduledPostId){
      return NextResponse.json({error : 'Post id is not provide '} , {status : 400})
    }

    const updatedUser = await Usermodel.findByIdAndUpdate(
      userId,
      { $push: { scheduledPosts: ScheduledPostId } },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    return NextResponse.json({
      message: 'Post added to user successfully',
      user: updatedUser,
    }, { status: 201 });
  } catch (error) {
    console.error('Error adding post to user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}