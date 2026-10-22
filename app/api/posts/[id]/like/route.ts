//[POST]について
//いいねボタンが押されたらpostIdを受け取る
//postIdからpost.idを取得する
//getSessionServiceで取得したuserデータからuser.idを取得
//post.idとuser.idを使ってlikeテーブルを作る
//作ったlikeテーブルを返す
//[DELETE]について
//いいねボタンが押されたらpostIdを受け取る
//postIdからpost.idを取得する
//getSessionServiceで取得したuserデータからuser.idを取得
//post.idとuser.idを使ってlikeテーブルをからいいねした投稿を探していいねを解除する
//[GET]について
//Getリクエストが送られるごとに実行される
//postIdからpost.idを取得しgetSessionServiceで取得したuserデータからuser.idを取得
//postIdとuser.idでlikeテーブルから投稿にいいねがされているかを探して結果を返す

import { prisma } from "@/lib/prisma";
import { getSessionService } from "@/lib/services/getSessionService";
import { NextResponse } from "next/server";

export async function POST(
    request:Request,
    {params}:{params:Promise<{id:string}>}
){
    const {id}=await params;
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

    const user = await getSessionService();

    if(!user){
        return NextResponse.json(
            {message:"userがない"},
            {status:401}
        )
    }

    const like = await prisma.like.create({
        data:{
            userId:user.id,
            postId:post.id,
        }
    })

    return NextResponse.json(like);
}
export async function DELETE(
    request:Request,
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

    const like = await prisma.like.findUnique({
        where:{
            userId_postId:{
                postId:Number(id),
                userId:user.id,
            }
        }
    })

    if(!like){
        return NextResponse.json(
            {message:"likeがない"},
            {status:404}
        )
    }

    const likeDelete = await prisma.like.delete({
        where:{
            id:like.id,
        }
    })

    return NextResponse.json(likeDelete);

}
export async function GET(
    request:Request,
    {params}:{params:Promise<{id:string}>}
){
    const {id}=await params;

    const user = await getSessionService();

    if(!user){
        return NextResponse.json(null);
    }

    const like = await prisma.like.findUnique({
        where:{
            userId_postId:{
                postId:Number(id),
                userId:user.id,
            }
        }
    })

    return NextResponse.json(like);


}