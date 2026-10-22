//post.idをURLで受け取りidとする
//getSessionService()でcookieからuserデータを取得
//commentテーブルを作りそれを返す

import { prisma } from "@/lib/prisma";
import { getSessionService } from "@/lib/services/getSessionService";
import { NextResponse } from "next/server";

export async function POST(
    request:Request,
    {params}:{params:Promise<{id:string}>}
){
    const {id} = await params;
    const reply = await request.json();

    if(reply.content===""){
        return NextResponse.json(
            {message:"本文がない"},
            {status:400}
        )
    }

    const user = await getSessionService();

    if(!user){
        return NextResponse.json(
            {message:"userがない"},
            {status:401}
        )
    }

    const post = await prisma.post.findUnique({
        where:{
            id:Number(id),
        }
    })

    if(!post){
        return NextResponse.json(
            {message:"postがない"},
            {status:404}
        )
    }

    const comment = await prisma.comment.create({
        data:{
            content:reply.content,
            userId:user.id,
            postId:post.id
        }
    })
    return NextResponse.json(comment);
}