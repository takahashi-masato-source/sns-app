import { NextResponse } from "next/server";
import { loginService } from "@/lib/services/loginService";

export async function POST(request:Request){
    try{
        const body = await request.json();
        await loginService(body.mail,body.password);

        return NextResponse.json(
            {message:"ログイン成功"},
            {status:200}
        )
    }catch(error){
        return NextResponse.json(
            {message:"ログイン失敗"},
            {status:500}
        )

    }


}