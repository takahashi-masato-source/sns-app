// postテーブルのidを受け取る
// そのidを使って投稿編集画面に遷移する
// 編集する投稿のidをURLに渡す
// その処理を実行するbuttonを作る

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