// フォローするためのAPI
// getSessionService()からフォローする自分のuserデータを取得してfollowerUserに入れる
// 送られてきたフォローされる相手のuserデータを取得してfollowingUserに入れる
// 二つのデータを使いFollowテーブルに新しいレコードを作成
// 作成した新しいレコードのデータを返す

import { prisma } from "@/lib/prisma";
import { getSessionService } from "@/lib/services/getSessionService";
import { NextResponse } from "next/server";

export async function POST(
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

    if(followingUser.id===followerUser.id){
        return NextResponse.json(
            {message:"自分自身をフォローしようとしている"},
            {status:400}
        )
    }

    const follow = await prisma.follow.create({
        data:{
            followerId:followerUser.id,
            followingId:followingUser.id,
        }
    })

    return NextResponse.json(follow);
}