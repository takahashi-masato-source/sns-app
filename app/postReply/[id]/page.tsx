//post.idを受け取る
//返信する文章を入力して返信ボタンを押す
//APIに対して入力された文章を渡す

"use client";

import { useRouter } from "next/navigation";
import { SubmitEvent, use, useState } from "react";

export default function PostReplyId(
    {params}:{params:Promise<{id:string}>}
){
    const[comment,setComment]=useState("");
    const {id} = use(params);
    const router = useRouter();

    async function handleReply(e:SubmitEvent<HTMLFormElement>){
        e.preventDefault();

        const response = await fetch(`/api/posts/${id}/reply`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                content:comment,
            })
        })
        const data =await response.json();
        console.log(data);
        if(response.ok){
            router.push("/posts");
        }
    }
    return(
        <main>
            <h1>返信する文章を入力してください</h1>
            <form onSubmit={handleReply}>
                <div>
                    <textarea name="content" onChange={(e)=>setComment(e.target.value)}></textarea>
                    <button type="submit">返信</button>
                </div>
            </form>
        </main>
    )
}