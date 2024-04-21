import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(`User trying to login with ${email}  and ${password}`);
    const user = await User.findOne({email});
    console.log(`user is ${user}`)
    if (!user) {
      return NextResponse.json(
        { error: "User does not exists" },
        { status: 400 }
      );
     
    }
   
    const isPasswordValid = await bcryptjs.compare(password, user?.password);
    if (!isPasswordValid)
      return NextResponse.json({ error: "Invalid Password" });
    // if password is validate then we have to craete a Json token
    const tokenData = {
      id: user._id,
      email: user.email,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_TOKEN!, {
      expiresIn: "1d",
    });
    // creting a responce variable
    const response = NextResponse.json({
      message: "Logged In success",
      success: true,
    });
    // setting the  token in cookie of response
    response.cookies.set("token", token,{httpOnly:true});
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
