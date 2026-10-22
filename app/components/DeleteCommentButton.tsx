//commentのidを受け取る
//削除ボタンを作る
//commentを削除するAPIにcomement.idを送る
//関数の最後にrouter.refresh()でページを更新する

"use client";

import { useRouter } from "next/navigation";

export function DeleteCommentButton(
    {commentId}:{commentId:number}
){
    const router = useRouter();
    async function handleDeleteComment() {
        const response = await fetch(`/api/comment/${commentId}/delete`,{
            method:"DELETE",
        })

        const data = await response.json();
        console.log(data);
        if (response.ok) {
            router.refresh();
        } else {
            console.log("コメントの削除に失敗しました");
        }
    }
    return(
        <main>
            <button onClick={handleDeleteComment}>返信を削除</button>
        </main>
    )
}