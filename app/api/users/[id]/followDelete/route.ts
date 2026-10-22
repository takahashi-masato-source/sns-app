// フォローを削除するAPI
// getSessionService()でcookieからログインしているuserのデータを取得
// URLで送られた相手のuser.idを使って実際にDBに存在するか確認して取得
// 自分のuser.idと相手のuser.idを使ってfollowテーブルからデータを取得
// 取得したデータのidを使って該当するレコードを削除

import { prisma } from "@/lib/prisma";
import { getSessionService } from "@/lib/services/getSessionService";
import { NextResponse } from "next/server";

export async function DELETE(
    request:Request,
    {params}:{params:Promise<{id:string}>}
){
    const {id}=await params;

    const followerUser = await getSessionService();

    if(!followerUser){
        return NextResponse.json(
            {message:"自分のuserデータがない"},
            {status:401}
        )
    }

    const followingUser = await prisma.user.findUnique({
        where:{
            id:Number(id),
        }
    })

    if(!followingUser){
        return NextResponse.json(
            {message:"相手のuserデータがない"},
            {status:401}
        )
    }

    const followData=await prisma.follow.findUnique({
        where:{
            followerId_followingId:{
                followerId:followerUser.id,
                followingId:followingUser.id,
            }
        }
    })

    if(!followData){
        return NextResponse.json(
            {message:"フォローしてない"},
            {status:401}
        )
    }

    const followDelete = await prisma.follow.delete({
        where:{
            id:followData.id,
        }
    })

    return NextResponse.json(followDelete);


}