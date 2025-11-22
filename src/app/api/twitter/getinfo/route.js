import axios from "axios";
import connectDB from "@/helper/ConnectDB";
import Usermodel from "@/modles/Usermodel";
import SocailMediaAccountModel from "@/modles/SocailMediaAccountModel";
import { NextResponse } from "next/server";
import { getId } from "@/helper/getId";
export async function GET(request) {

    await connectDB();
    const token = request.nextUrl.searchParams.get('token');
    // const id = request.nextUrl.searchParams.get('SocailaccountId');
    let access_token = request.nextUrl.searchParams.get('access_token');

    console.log(token , 'token')
    console.log("access token" , access_token)
   
    // const token_created_at = new Date(user.token_created_at).getTime();
    // const token_created_at = user?.token_created_at;
    // const expires_in = user?.expires_in;
    // if (Date.now() > token_created_at + expires_in * 1000) {
        // const response = await axios.get(`${process.env.HOST}/api/twiter/refreshtoken?socialAccountId=${id}`)
        // access_token = response.data.access_token;
    // }
    if (!access_token) {
        return NextResponse.json({ error: 'No access token found' }, { status: 400 });
    }

    const data = await axios.get('https://api.twitter.com/2/users/me?user.fields=profile_image_url', {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    })
    console.log(data.data)
    return NextResponse.json({ data: data.data.data }, { status: 200 });


}