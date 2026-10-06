"use client"

import { useRouter } from "next/navigation";

export function PatchPostButton(
    {postId}:{postId:number},
){
    const router = useRouter();
    function goToEdit() {
        router.push(`/postEdit/${postId}`); 
    }
    return(
        <main>
            <button onClick={goToEdit}>自分の投稿を編集</button>
        </main>
    )
}