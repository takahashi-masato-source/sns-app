import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request:Request){
    try{
        const body = await request.json();

        if(body.mail===""){
            return NextResponse.json(
                {error:"メールが空白"},
                {status:400}
            )
        }
        if(body.password===""){
            return NextResponse.json(
                {error:"パスワードが空白"},
                {status:400}
            )
        }

        const passwordhash = await bcrypt.hash(body.password,10);

        const user = await prisma.user.create({
            data:{
                mail:body.mail,
                passwordHash:passwordhash,
            },
        });

        return NextResponse.json(user);
    }catch(error){
        if(error==="P2002"){
            return NextResponse.json(
                {error:"パスワードの重複"},
                {status:409}
            )
        }
    }
    return NextResponse.json(
        {message:"登録完了"}
    )

    
}