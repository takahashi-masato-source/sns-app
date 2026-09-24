import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request:Request){
    const body = await request.json();

    const loginUser = await prisma.user.findUnique({
        where:{
            mail:body.mail,
        }
    })

    if(!loginUser){
        return NextResponse.json(
            {error:"ログイン情報がない"},
            {status:400}
        )
    }

    const isMatch = await bcrypt.compare(
        body.password,
        loginUser.passwordHash
    )

    if(!isMatch){
        return NextResponse.json(
            {error:"パスワードが違う"},
            {status:400}
        )
    }
    const session = await prisma.session.create({
        data:{
            id:crypto.randomUUID(),
            userId:loginUser.id
        }
    })

    const cookiestore = await cookies();
    cookiestore.set("sessionId",session.id);

    return NextResponse.json(
        {message:"ログイン成功"},
    )

}
