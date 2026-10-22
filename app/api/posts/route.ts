//投稿内容を受け取る
//getSessionService()からログイン中のUserを取得する
//Userのidを使って、投稿内容とUserを紐づけてPostを作成する
//作成したPostを返す

import { prisma } from "@/lib/prisma";
import { getSessionService } from "@/lib/services/getSessionService";
import { NextResponse } from "next/server";

export async function POST(request:Request){
    const body: { content: string } = await request.json();

    const user = await getSessionService();

    if(!user){
        return NextResponse.json(
            {message:"ログイン情報がない"},
            {status:401}
        )
    }

    const post = await prisma.post.create({
        data:{
            content:body.content,
            userId:user.id
        }
    })

    return NextResponse.json(post);
}