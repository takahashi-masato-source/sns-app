//投稿する内容を書いて実際に投稿するページ

"use client"

import { FormEvent, useState } from "react"

export default function PostCreate(){
    const[post,setPost]=useState("");

    async function handlePost(e:FormEvent){
        e.preventDefault();

        const response = await fetch("/api/posts",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                content:post,
            })
        })
    }
    return(
        <main>
            <h1>投稿を作成</h1>
            <form onSubmit={handlePost}>
                <label>
                    投稿内容
                    <textarea name="post" onChange={(e)=>setPost(e.target.value)}></textarea>
                </label>
                <button type="submit">投稿する</button>
            </form>
        </main>
    )
}