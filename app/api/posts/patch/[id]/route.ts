//postのcontentを編集する

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