import { NextResponse } from 'next/server';
import connectDB from '@/helper/ConnectDB';
import Usermodel from '@/modles/Usermodel';
import axios from "axios";
import { getId } from '@/helper/getId';
export async function GET(request) {
    await connectDB();
    const token = request.cookies.get('token')?.value || '';
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const id = await getId(token);
    const user = await Usermodel.findById(id);
    const oldrefresh_token = user?.refresh_token;


    const Refreshresponse = await axios.post(
        'https://api.twitter.com/2/oauth2/token',
        new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: oldrefresh_token,
            client_id: process.env.TWITTER_CLIENT_ID,
        }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },


        }
    )

    const { access_token, refresh_token, expires_in, scope } = Refreshresponse.data;
    const updatedUser = await Usermodel.findByIdAndUpdate(id, {
        $set: {
            access_token,
            refresh_token,
            expires_in,
            scope,
            token_created_at: Date.now(),
        },
    }, { new: true });
    return NextResponse.json({ message: 'Token refreshed successfully', user: updatedUser }, { status: 200 });

}