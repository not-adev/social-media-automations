import connectDB from "@/helper/ConnectDB";
import ScheduledPost from "@/modles/ScheduledPostModel";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req, res) {
    await connectDB()

    try {
        const reqbody = await req.json()
        const { platform, user_id, content, scheduled_time,post_id,state,socialAccountID } = reqbody;
        if (!platform || !user_id || !content || !scheduled_time) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 401 });
        }

        const newPost = new ScheduledPost({
            platform,
            user_id,
            content,
            scheduled_time,
            state: state? state : 'pending',
            Post_id : post_id?post_id : null ,
            socailAccount_id : socialAccountID
        });

        const savedPost = await newPost.save();
        const Post_request_data = {
            userId: newPost.user_id,
            ScheduledPostId: newPost._id
        }
        
        console.log(" post data" , Post_request_data)
        const updating_user = await axios.put(`${process.env.HOST}/api/AddScheduledPost`, Post_request_data)
        return NextResponse.json({ message: 'Post scheduled successfully', post: savedPost });
    } catch (error) {
        console.error('Error scheduling post:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}