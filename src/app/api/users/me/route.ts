import {getDataFromToken} from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server";
import {connect} from "@/db/db";

connect();

export async function GET(request: NextRequest) {
    try{
        const userId = await getDataFromToken(request as any);
        if(!userId){
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }
        const user = await User.findOne({_id: userId}).select("-password");
        if(!user){
            return NextResponse.json({error: "User not found"}, {status: 404});
        }
        return NextResponse.json({message: "User found", user}, {status: 200});
    }catch(error:any){
        console.log("Error in me route:", error.message);
        return NextResponse.json({error: error.message}, {status: 500});
    }  

}