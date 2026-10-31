//comment.idをURLでもらう
//getSessionService()でログイン中のuserデータを取得
//commentIdで削除するcommentを探す
//削除するcommentのuserIdとログイン中のuser.idを比較して認可されているかを確認
//commentを削除する

import { prisma } from "@/lib/prisma";
import { getSessionService } from "@/lib/services/getSessionService";
import { NextResponse } from "next/server";

export async function DELETE(
    _request:Request,
    {params}:{params:Promise<{id:string}>}
){
    const {id}=await params;
    const user = await getSessionService();

    if(!user){
        return NextResponse.json(
            {message:"userがない"},
            {status:401}
        )
    }

    const comment = await prisma.comment.findUnique({
        where:{
            id:Number(id),
        }
    })

    if(!comment){
        return NextResponse.json(
            {message:"commentがない"},
            {status:404}
        )
    }

    if(comment.userId!==user.id){
        return NextResponse.json(
            {message:"commentを削除する権限がない"},
            {status:403}
        )
    }

    const deleteComment = await prisma.comment.delete({
        where:{
            id:comment.id,
        }
    })

    return NextResponse.json(deleteComment);
}