import ScheduledPost from "@/modles/ScheduledPostModel";
import connectDB from "@/helper/ConnectDB";
import { NextResponse } from "next/server";

export async function GET(req,res) {
    try {
        console.log("hit by node js server")
        await connectDB()
        const now = new Date()
        const upcomingPost = await ScheduledPost.find({
            scheduled_time: { $lte: now },
            state: 'pending'
        }).sort({ scheduled_time: 1 });
        console.log(upcomingPost)
       return  NextResponse.json({message : "fetch succesfll" , upcomingPost : upcomingPost}, {status : 200})

    } catch (error) {
        console.log(error)
        return NextResponse.json({error : "internal server error "} , {status : 500})
    }
}