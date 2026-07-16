import {connect} from "@/db/db";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody; 
        console.log(reqBody);

        // Check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }   
        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create a new user
        const newUser = new User({
            username,
            email,  
            password: hashedPassword
        });
        const savedUser = await newUser.save();
        console.log(savedUser);
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        }, {status: 201});

    }
    catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}