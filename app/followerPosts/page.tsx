// フォローしている全ユーザーの投稿を表示するページ
// // コンポーネントの初回表示時に投稿を取得する

"use client";

import { useEffect, useState } from "react";

type post={
    id:number;
    content:string;
}

export default function FollowerPosts(){
    const[posts,setPosts]=useState<post[]>([]);
    useEffect(()=>{
        async function getPosts(){
            const response = await fetch("/api/users/followerGet");
            const posts = await response.json();

            console.log(posts);
            setPosts(posts);
        }
        getPosts()
    },[])
    return(
        <main>
            <h1>フォローしているUserの投稿一覧</h1>
            {
                posts.length===0?(
                    <p>投稿がありません</p>
                ):(
                    posts.map((post)=>(
                        <div key={post.id}>
                            <p>{post.content}</p>
                        </div>
                    ))
                )
            }
        </main>
    )
}