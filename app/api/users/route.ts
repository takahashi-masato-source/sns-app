import { userService } from "@/lib/services/userService";
import { NextResponse } from "next/server";

export async function POST(request:Request){
    const body = await request.json();

    try{
        const user = await userService(body.name, body.mail, body.password,body.bio);

        return NextResponse.json(user);
    }catch(error){
        return NextResponse.json(
            {message:"登録失敗"},
            {status:400}
        );
    }
}