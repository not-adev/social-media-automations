import { NextResponse } from "next/server";
export async function GET(request) {

    
const REDIRECT_URI = "http://localhost:3000/api/Facebook/callback";
console.log("api login ")

    const SCOPES = [
        "instagram_basic",
        "instagram_content_publish",
        "pages_read_engagement",
        "pages_show_list",
        "instagram_manage_comments",
        "instagram_content_publish",
        "instagram_manage_messages",
        "instagram_branded_content_brand",
        "instagram_branded_content_creator",
        "instagram_branded_content_ads_brand",
        "instagram_manage_upcoming_events",
        
    ];
    const authUrl = NextResponse.redirect(`https://www.facebook.com/v16.0/dialog/oauth?` +
        new URLSearchParams({
            client_id: process.env.FACEBOOK_APP_ID,
            redirect_uri:REDIRECT_URI,
            scope: SCOPES.join(","),
            response_type: 'code' ,
        }).toString()
    )

    return authUrl
}