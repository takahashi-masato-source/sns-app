//postIdを使ってログイン中のユーザーが投稿にいいねしているか確認する
//いいねしていない場合はいいねを作成するボタンを表示する
//いいねしている場合はいいねを解除するボタンを表示する
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function LikePostButton(
    {postId}:{postId:number}
){
    const router = useRouter();
    const[isLiked,setIsLiked]=useState(false);
    useEffect(()=>{
        async function likeGet(){
            const likeGet = await fetch(`/api/posts/${postId}/like`)
            const likeGetData = await likeGet.json();

            if(likeGet.ok){
                setIsLiked(likeGetData!==null);
            }

        }
        likeGet();
    },[postId])

    async function handleLikePost(){
        const likePost = await fetch(`/api/posts/${postId}/like`,{
            method:"POST",
        })
        
        if (likePost.ok) {
            setIsLiked(true);
        }
        console.log(likePost);
        router.refresh();
    }
    async function handleLikeDelete(){
        const likeDelete = await fetch(`/api/posts/${postId}/like`,{
            method:"DELETE",
        })
        if(likeDelete.ok){
            setIsLiked(false);
        }
        console.log(likeDelete);
        router.refresh();
    }
    return(
        <main>
            {
                isLiked?
                <button onClick={handleLikeDelete}>いいね</button>
                :<button onClick={handleLikePost}>いいね</button>
            }
        </main>
    )
}