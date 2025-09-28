import { NextResponse } from 'next/server';
import Usermodel from '@/modles/Usermodel';
import connectDB from '@/helper/ConnectDB';
import { getId } from '@/helper/getId';
import SocailMediaAccountModel from '@/modles/SocailMediaAccountModel';


export async function GET(req) {
    await connectDB();
    const token = req.cookies.get('token')?.value || ''
    if (!token) {
        return NextResponse.json({ message: "no token" }, { status: 401 } )
    }
    const _id = await getId(token)
    const user = await Usermodel.findOne({ _id: _id }).populate('accounts')
    console.log(user)

    return NextResponse.json({ message: 'User synced successfully', data: user.accounts }, { status: 200 });
}
