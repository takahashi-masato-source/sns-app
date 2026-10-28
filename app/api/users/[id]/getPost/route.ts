// 投稿を編集する際に既存の文章を取得するAPI
// URLから編集対象のpost.idを受け取る
// getCompareService()で、このユーザーがその投稿を編集していいか確認する
// URLから受け取ったpost.idを使って編集対象の投稿を取得する
// 編集対象の投稿の文章だけを返す

import { prisma } from "@/lib/prisma";
import { getCompareService } from "@/lib/services/getCompareService";
import { NextResponse } from "next/server";

export async function GET(
    _request:Request,
    {params}:{params:Promise<{id:string}>}
){
    const {id} = await params;
    const user = await getCompareService(id);

    if(!user){
        return NextResponse.json(
            {message:"ログイン情報がない"},
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
            {message:"投稿がない"},
            {status:401}
        )
    }

    return NextResponse.json(post.content);



}