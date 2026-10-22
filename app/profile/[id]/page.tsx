// URLのidを受け取る
// 受け取ったidを使ってプロフィールAPIからUserとPost[]を取得する
// 取得したプロフィール情報と投稿を表示する
// 投稿一覧ページで投稿者の名前をクリックすることで遷移

"use client";

import { use, useEffect, useState } from "react"

type Post = {
    id: number;
    content: string;
    userId: number;
    createdAt: string;
};

type Profile = {
    id: number;
    name: string;
    mail: string;
    bio: string;
    post:Post[];
    _count: {
        followers: number;
        following: number;
    };
};

export default function ProfileId(
    {params}:{params:Promise<{id:string}>}
){
    const [profile,setProfile]=useState<Profile | null>(null);
    const {id} = use(params);
    useEffect(()=>{
        async function getPosts(){
            const response = await fetch(`/api/profile/${id}`);
            const posts = await response.json();

            setProfile(posts);
        }
        getPosts();
    },[id])

    return(
        <main>
            {profile&&(
                <div>
                    <h1>{profile.name}の投稿</h1>
                {
                    profile.post.map((post)=>(
                        <div key={post.id}>
                            <p>{post.content}</p>
                            <p>{post.createdAt}</p>
                        </div>
                    ))
                }
                {/* 
                    Followテーブルのレコードが作られる際に自分のuser.idをfollowerIdに、
                    フォローする相手のuser.idをfollowingIdに入れて作る

                    だから自分がフォローしている数は、
                    Follow.followerIdが自分のuser.idと一致するレコードの数になる

                    なぜなら、自分が誰かをフォローしたという記録は、
                    Follow.followerIdに自分のuser.idを入れることで保存されるから

                    そしてUserテーブルでFollowテーブルとリレーション関係を作る際に、
                    User.followingとFollow.followerを
                    @relation("UserFollowing", fields: [followerId], references: [id])で結びつけている

                    そのため、User.followingは「自分のuser.idとFollow.followerIdが一致する関係」を表す
                    だからフォローしている数はprofile._count.followingになる

                    逆に、User.followersとFollow.followingを
                    @relation("UserFollowers", fields: [followingId], references: [id])で結びつけているため、
                    User.followersは「自分のuser.idとFollow.followingIdが一致する関係」を表す
                */}
                <p>フォローしている数</p>
                <p>{profile._count.following}</p>
                <p>フォローされている数</p>
                <p>{profile._count.followers}</p>
                </div>
            )}
        </main>
    )
}