import { NextResponse } from 'next/server';
import connectDB from '@/helper/ConnectDB';
// import Usermodel from '@/modles/Usermodel';
import SocailMediaAccountModel from '@/modles/SocailMediaAccountModel';
import axios from "axios";
// import { getId } from '@/helper/getId';
export async function GET(req,res) {
    await connectDB();
    const url = new URL(req.url)
    const socialAccountId = url.searchParams.get('socialAccountId')   
    const socailAccount = await SocailMediaAccountModel.findById(socialAccountId)
    const oldrefresh_token = socailAccount?.refresh_token

    const credentials = Buffer.from(`${process.env.TWITTER_CLIENT_ID}:${process.env.TWITTER_CLIENT_SECRET}`).toString("base64");
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
                Authorization: `Basic ${credentials}`
            },


        }
    )

    const { access_token, refresh_token, expires_in, scope } = Refreshresponse.data;
    const updatedSocailAccount = await SocailMediaAccountModel.findByIdAndUpdate({_id: socialAccountId}, {
        $set: {
            access_token,
            refresh_token,
            expires_in,
            scope,
            token_created_at: Date.now(),
        },
    }, { new: true });
    console.log(updatedSocailAccount)
    return NextResponse.json({ message: 'Token refreshed successfully', socailAccount: updatedSocailAccount }, { status: 200 });

}