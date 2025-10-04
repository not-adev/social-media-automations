import axios from "axios";
import connectDB from "@/helper/ConnectDB";
import Usermodel from "@/modles/Usermodel";
import { NextResponse } from "next/server";
import { getId } from "@/helper/getId";
export async function GET(request) {
    console.log("Get Twitter Info")
    await connectDB();
    // const token = request.cookies.get('token')?.value || ''
    const token =  request.nextUrl.searchParams.get('token');

    console.log(token)
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDkwZThmZjhhOWVhMDg5NTM5MmU2MyIsImlhdCI6MTc1OTM0MjkyMywiZXhwIjoxNzU5NTE1NzIzfQ.ULGcQ_CJKYvW50Gqq-fD_AA932LS_9T0vp1_Z0TomZw'
    const id = await getId(token);
  
    const user = await Usermodel.findById(id);
    let access_token = user?.access_token;
    const token_created_at = user?.token_created_at;
    const expires_in = user?.expires_in;
    if (Date.now() > token_created_at + expires_in * 1000) {
        // Token has expired, refresh it
        const response = await axios.get('/api/twiter/refreshtoken')
        access_token = response.data.access_token;
    }
    if (!access_token) {
        return NextResponse.json({ error: 'No access token found' }, { status: 400 });
    }

    const data = await axios.get('https://api.twitter.com/2/users/me?user.fields=profile_image_url', {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    })
    console.log(data.data)
   return  NextResponse.json({ data: data.data.data }, { status: 200 });
   

}