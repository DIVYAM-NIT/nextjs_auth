import {connect} from "@/db/db";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;

        // Check if user exists
        const existingUser = await User.findOne({email});
        if(!existingUser) {
            return NextResponse.json({error: "User does not exist"}, {status: 400});
        }   
        // Compare the password 
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordValid) {
            return NextResponse.json({error: "Invalid password"}, {status: 400});
        }   

        //generate a token 
        const tokenData = {
            id: existingUser._id,
            email: existingUser.email,
        }
        const Token = jwt.sign(
            tokenData,
            process.env.ACCESS_TOKEN_SECRET!,
            {expiresIn: "1h"}
        )
        const response= NextResponse.json({
            message: "Login successful",
            success: true,
        });
        response.cookies.set("token", Token, 
            {
                httpOnly: true
            }
        )
        return response;

    }catch (error:any) {
        console.log("Error in login route:", error.message);
        return NextResponse.json({error: error.message}, {status: 500});
    }
}