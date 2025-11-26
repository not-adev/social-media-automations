import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import { getId } from "@/helper/getId";

export async function GET(request, response) {


    console.log('callback hit ')

    const url = new URL(request.url);
    const token = request.cookies.get('token')?.value || '';
    const id = await getId(token);

    const REDIRECT_URI = `http://localhost:3000/api/Facebook/callback`
    const code = url.searchParams.get('code')
    if (!code) {
        return NextResponse.json({ error: "Missing code in callback" }, { status: 400 });
    }

    // try {
    // Exchange code for short-lived token
    const tokenResp = await axios.get("https://graph.facebook.com/v24.0/oauth/access_token", {
        params: {
            client_id: process.env.FACEBOOK_APP_ID,
            redirect_uri: REDIRECT_URI,
            client_secret: process.env.FACEBOOK_API_SECRET,
            code: code
        }
    });
    console.log(tokenResp.data)
    const shortLivedToken = tokenResp.data.access_token;

    const longLivedResp = await axios.get("https://graph.facebook.com/v24.0/oauth/access_token", {
        params: {
            grant_type: "fb_exchange_token",
            client_id: process.env.FACEBOOK_APP_ID,
            client_secret: process.env.FACEBOOK_API_SECRET,
            fb_exchange_token: shortLivedToken
        }
    });

    const longLivedToken = longLivedResp.data.access_token;
    console.log(longLivedToken)


    // // Exchange for long-lived token
   const getID = await axios.get(`https://graph.facebook.com/v24.0/me?fields=id,name,picture&access_token=${longLivedToken}`)
   console.log(getID.data)


    


    const userPages = await axios.get(`https://graph.facebook.com/v24.0/me/accounts?access_token=${longLivedToken}`);
    console.log('aceess token for page  ')
    console.log(userPages.data);

    // const getuserInstagramDAta = await axios.get(`https://graph.facebook.com/v16.0/${intagramId}?fields=id,username,name,profile_picture_url&access_token=${longLivedToken}`);
    // const userInstagramDAta = getuserInstagramDAta.data

    // console.log({
    //     name: userInstagramDAta.name,
    //     platform: 'instagram',
    //     username: userInstagramDAta.username,
    //     profilePicture: userInstagramDAta.profile_picture_url,
    //     access_token: longLivedToken,
    //     refresh_token: null,
    //     expires_in: exchangeResp.data.expires_in,
    //     scope: 'all',
    //     token_created_at: Date.now(),
    //     user: id
    // })

    // // const savingNewAccount = await axios.post(`${process.env.HOST}/api/AddSocialAccount`,
    // //     {
    // // name: userInstagramDAta.name,
    // // platform: 'instagram',
    // // username: userInstagramDAta.username,
    // // profilePicture: userInstagramDAta.profile_picture_url,
    // // access_token: longLivedToken,
    // // refresh_token: null,
    // // expires_in: exchangeResp.data.expires_in,
    // // scope: 'all',
    // // token_created_at: Date.now(),
    // // user: id
    // //     }
    // // )
    const backtoApp = NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOST}/dashboard/home`)
    return backtoApp


    // } catch (err) {
    //     console.error("Error in token exchange:", err.response?.data || err);
    //     return NextResponse.json({ error: "Error exchanging code for token" }, { status: 500 });
    // }
}