import connectDB from "@/helper/ConnectDB";
import { NextResponse, NextRequest } from "next/server";
import { getId } from "@/helper/getId";
import SocailMediaAccountModel from "@/modles/SocailMediaAccountModel";
import Usermodel from "@/modles/Usermodel";
export async function POST(request) {
    await connectDB()
    console.log("hi from add social account api")
    const requestBody = await request.json();
    
    console.log(requestBody)
    const { name, platform, username, profilePicture } = requestBody;
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token') || '';

    if (!token) {

        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const id = await getId(token);


    const found = await SocailMediaAccountModel.findOne({ username: username })
    if (found) {
        return NextResponse.json({ message: 'Account already exists' }, { status: 200 });
    }
    const newAccount = new SocailMediaAccountModel({
        platform,
        username,
        profilePicture,
        user: id,
        name: name
    });

    await newAccount.save();
    const userAcount = await Usermodel.findOneAndUpdate({_id : id} , {$push : {accounts : newAccount._id }});
    console.log(userAcount)
    return NextResponse.json({ message: 'Account added successfully' }, { status: 201 });

}