import { NextResponse } from 'next/server';
import Usermodel from '@/modles/Usermodel';
import connectDB from '@/helper/ConnectDB';
import { getId } from '@/helper/getId';
import ScheduledPost from '@/modles/ScheduledPostModel';


export async function GET(req) {
    await connectDB();
    const token = req.cookies.get('token')?.value || ''
    console.log("Token:", token);
    if (!token) {
        return NextResponse.json({ message: "no token" }, { status: 401 })
    }
    const _id = await getId(token)
    const user = await Usermodel.findOne({ _id })
        .populate({
            path: 'accounts',
            populate: {
                path: 'posts'
            }
        });
    console.log(user)

    return NextResponse.json({ message: 'User synced successfully', allAccounts: user.accounts }, { status: 200 });
}
