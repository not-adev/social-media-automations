import axios from 'axios';
import Usermodel from '@/modles/Usermodel';
import { NextResponse } from 'next/server';
import { getId } from '@/helper/getId';
import qs from 'qs'

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  const code_verifier = request.cookies.get('code_verifier')?.value || '';
  const token = request.cookies.get('token')?.value || '';
  const id = await getId(token);

  if (!code || !code_verifier) {
    return NextResponse.json({ error: 'Missing code or code_verifier' }, { status: 400 });
  }

  try {
    // 🔑 Exchange authorization code for tokens
    const response = await axios.post(
      'https://api.twitter.com/2/oauth2/token',
      qs.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: 'http://localhost:3000/api/twiter/callback',
        code_verifier: code_verifier,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(
            `${process.env.TWITTER_CLIENT_ID}:${process.env.TWITTER_CLIENT_SECRET}`
          ).toString('base64')}`,
        },
      }
    );

    const { access_token, refresh_token, expires_in, scope } = response.data;

    // 🗂 Save to user in DB
    await Usermodel.findByIdAndUpdate(id, {
      $set: {
        access_token,
        refresh_token,
        expires_in,
        scope,
        token_created_at: Date.now(),
      },
    });
   return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOST}/dashboard/home`);

  } catch (err) {
    console.error('Twitter OAuth Error:', err.response?.data || err.message);
    return NextResponse.json(
      { error: err.response?.data || err.message },
      { status: 500 }
    );
  }
}
