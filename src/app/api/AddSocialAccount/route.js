import connectDB from "@/helper/ConnectDB";
import { NextResponse, NextRequest } from "next/server";
import { getId } from "@/helper/getId";
import SocailMediaAccountModel from "@/modles/SocailMediaAccountModel";
import Usermodel from "@/modles/Usermodel";
export async function POST(request) {
    await connectDB()

    const requestBody = await request.json();

    const { name, platform, username, profilePicture, access_token,
        refresh_token,
        expires_in,
        scope,
        token_created_at, user } = requestBody;
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token') || '';

    if (!token) {

        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const id = await getId(token);

    const found = await SocailMediaAccountModel.findOne({ user: user })
    if (found) {
        found.access_token = access_token
        found.refresh_token = refresh_token
        found.token_created_at = token_created_at
        await found.save()

        return NextResponse.json({ message: 'Account already exists' }, { status: 200 });
    }
    const newAccount = new SocailMediaAccountModel({
        platform,
        username,
        profilePicture,
        user: id,
        name: name,
        access_token,
        refresh_token,
        expires_in,
        scope,
        token_created_at

    });

    await newAccount.save();
    const userAcount = await Usermodel.findOneAndUpdate({ _id: id }, { $push: { accounts: newAccount._id } });
    console.log(userAcount)
    return NextResponse.json({ message: 'Account added successfully', _id: newAccount._id }, { status: 201 });

}