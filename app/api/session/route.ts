import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET(){
    const cookiestore = await cookies();
    const sessionId = cookiestore.get("sessionId")?.value;

    if(!sessionId){
        return NextResponse.json(
            {message:"cookieがない"},
            {status:401},
        )
    }

    const session = await prisma.session.findUnique({
        where:{
            id:sessionId,
        }
    })

    if(!session){
        return NextResponse.json(
            {message:"sessionがない"},
            {status:401}
        )
    }

    const userId = session.userId;

    const user = await prisma.user.findUnique({
        where:{
            id:userId,
        },
        select:{
            id:true,
        }
    })

    return NextResponse.json(user);
}
export async function DELETE(){
    try{
        const cookiestore = await cookies();
        const sessionId = cookiestore.get("sessionId")?.value;

        if(!sessionId){
            return NextResponse.json(
                {message:"cookieがない"},
                {status:401}
            )
        }

        const session = await prisma.session.delete({
            where:{
                id:sessionId,
            }
        })

        cookiestore.delete("sessionId")

        return NextResponse.json({
            message: "ログアウトしました",
        });
    }catch(error){
        return NextResponse.json(
            {message:"ログアウト失敗"},
            {status:500}
        )
    }
    

}