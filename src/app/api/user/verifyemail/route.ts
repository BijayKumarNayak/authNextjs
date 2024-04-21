import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);
    // Now we have to find  the user using token and check if it is verified or not
    let user =await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt:Date.now() },
    });
    if(!user){
    return NextResponse.json({ error:"Invalid token" }, { status: 400 });

    }
    console.log(user)
    user.isVerified= true
    user.verifyToken=undefined
    user.verifyTokenExpiry= undefined
    await user.save()
    return NextResponse.json({ message:"User verified successfully",success: true}, { status: 2200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
