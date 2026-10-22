//postのidを受け取る
//getCompareService()で認可を確認する
//受けとったpostのidを指定して投稿内容を編集する
//編集した内容を返す


import { prisma } from "@/lib/prisma";
import { getCompareService } from "@/lib/services/getCompareService";
import { NextResponse } from "next/server";

export async function PATCH(
    request:Request,
    {params}:{params:Promise<{id:string}>}
){
    const {id}=await params;
    const body = await request.json();

    const user = await getCompareService(id);

    if(!user){
        return NextResponse.json(
            {message:"ログインミスor投稿がないor認可がない"},
            {status:500}
         )
    }

    const patchPost = await prisma.post.update({
        where:{
            id:Number(id),
        },
        data:{
            content:body.content,
        }
    })

    return NextResponse.json(patchPost);

}