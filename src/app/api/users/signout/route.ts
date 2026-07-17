import { connect } from "@/db/db";
import { NextResponse } from "next/server";


connect();

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Signout successful",
            success: true,
        });
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0), // Set the cookie to expire immediately
        });
        return response;
    }catch(error:any) {
        console.log("Error in signout route:",error.message);
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
