import ScheduledPost from "@/modles/ScheduledPostModel";
import connectDB from "@/helper/ConnectDB";
import { NextResponse } from "next/server";

export async function PUT(req,res) {
    await connectDB()
    const reqbody = await req.json()
    const {ScheduledPostId,postID} = reqbody
    const updatingScheduledPost = await ScheduledPost.findOneAndUpdate({_id :ScheduledPostId} ,
        {
            $set :{Post_id : postID}
        },
        {
            new : true 
        })
        if(!updatingScheduledPost){
            return NextResponse.json({message :"no Schduled post found "}, {status : 400})

        }
        return NextResponse.json({message :"post id updated succefully"},{status : 200})


}