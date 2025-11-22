import connectDB from "@/helper/ConnectDB";
import ScheduledPost from "@/modles/ScheduledPostModel";
import { NextResponse } from "next/server";

export async function PUT(req,res) {
    try {
        const reqbody =await req.json()
        const {ids} = reqbody
        
        await ScheduledPost.updateMany(
                { _id: { $in: ids } },
                { $set: { state: "posted" } }
        )
        return NextResponse.json({message : "state updated succefully" } , {status:200})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({error : "internal server error " }, {status : 500})
    }
}