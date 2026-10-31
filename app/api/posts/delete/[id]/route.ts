// postテーブルのidを受け取る
// getCompareService()にpost.idを渡してログイン中のUserがその投稿を削除できるか確認する
// 削除してよい場合そのpost.idのPostを削除する

import { prisma } from "@/lib/prisma";
import { getCompareService } from "@/lib/services/getCompareService";
import { NextResponse } from "next/server";

export async function DELETE(
    _request:Request,
    {params}:{params:Promise<{id:string}>}
){
    const {id}=await params;
    const user = await getCompareService(id);

    if(!user){
        return NextResponse.json(
            {message:"ログインミスor投稿がないor認可がない"},
            {status:500}
        )
    }


    const deletePost = await prisma.post.delete({
        where:{
            id:Number(id),
        }
    })

    return NextResponse.json(deletePost);
}