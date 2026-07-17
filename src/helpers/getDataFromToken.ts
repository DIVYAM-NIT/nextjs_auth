import {NextRequest, NextResponse} from 'next/server';
import  jwt from 'jsonwebtoken';



export async function getDataFromToken(request: NextRequest) {

    try{
        const token = request.cookies.get("token")?.value || '';
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {id: string, email: string, password: string};
        return decodedToken.id;
    }catch(error:any){
        console.log("Error in getDataFromToken: ", error);
        return null;
    }
}