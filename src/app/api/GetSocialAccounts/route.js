import { NextResponse } from 'next/server';
import Usermodel from '@/modles/Usermodel';
import connectDB from '@/helper/ConnectDB';
import { getId } from '@/helper/getId';


export async function GET(req) {
    await connectDB();
    const token = req.cookies.get('token')?.value || ''
    console.log("Token:", token);
    if (!token) {
        return NextResponse.json({ message: "no token" }, { status: 401 } )
    }
    const _id = await getId(token)
    console.log(_id)
    const user = await Usermodel.findOne({ _id: _id }).populate('accounts')
    console.log(user.accounts)
    
    return NextResponse.json({ message: 'User synced successfully', data: user.accounts }, { status: 200 });
}
