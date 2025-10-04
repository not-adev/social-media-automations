import { generateCodeChallenge, generateCodeVerifier } from "@/helper/TwiterCodeAndChallange";
import { NextResponse, NextRequest } from "next/server";
export async function GET(request) {
    console.log("hi ")
    const codeVerifer = generateCodeVerifier()
    const code_challenge = generateCodeChallenge(codeVerifer)

    console.log(codeVerifer)

    const response = NextResponse.redirect(
        `https://twitter.com/i/oauth2/authorize?` +
        new URLSearchParams({
            response_type: 'code',
            client_id: process.env.TWITTER_CLIENT_ID,
            redirect_uri: 'http://localhost:3000/api/twitter/callback',
            scope: 'tweet.read tweet.write users.read offline.access',
            state: 'secure_random_state',
            code_challenge,
            code_challenge_method: 'S256',
        }).toString()
    );


    response.cookies.set('code_verifier', codeVerifer, {
        path: '/',
        httpOnly: true,
    });

    
    
    

    return response;


}