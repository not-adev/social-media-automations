import connectDB from "@/helper/ConnectDB";
import Usermodel from "@/modles/Usermodel";
import { NextResponse } from "next/server";
import SocailMediaAccountModel from "@/modles/SocailMediaAccountModel";
import { getId } from "@/helper/getId";
export async function PUT(req, res) {

  try {
    await connectDB();
    const reqbody =await req.json()
    let { userId,ScheduledPostId,socailAccount_id } = reqbody;
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

    const updatedSocailAccount = await SocailMediaAccountModel.findByIdAndUpdate(socailAccount_id , 
      { $push :  {posts : ScheduledPostId } } , 
      { new : true }
    )

    if(!updatedSocailAccount){
      return NextResponse.json({message : "no social account associated with this post"} , {status : 400 })
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