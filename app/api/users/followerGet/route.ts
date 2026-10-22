// フォローしている全ユーザーの投稿を取得するAPI
// getSessionService()でログインuserのidを取得
// followテーブルのfollowerIdと取得したuserのidを比較してフォロー中の相手を取得
// フォロー中の相手は配列で取得されるためそこから相手userのidをfollowingIdとして取得
// postテーブルのuserIdとfollowingIdを比較して投稿を取得
// // inは指定した値のいずれかに一致するレコードを取得する条件

import { prisma } from "@/lib/prisma";
import { getSessionService } from "@/lib/services/getSessionService";
import { NextResponse } from "next/server";

export async function GET(){
    const followerUser=await getSessionService();

    if(!followerUser){
        return NextResponse.json(
            {message:"自分のデータがない"},
            {status:401}
        )
    }

    const followData=await prisma.follow.findMany({
        where:{
            followerId:followerUser.id
        }
    })

    if(followData.length === 0){
        return NextResponse.json([]);
    }

    const followingIds = followData.map((follow)=>(
        follow.followingId
    ));

    const posts = await prisma.post.findMany({
        where:{
            userId:{
                in:followingIds
            }
        }
    });

    return NextResponse.json(posts);
}