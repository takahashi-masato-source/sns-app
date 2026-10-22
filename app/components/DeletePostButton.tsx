// postテーブルのidを受け取る
// 受け取ったidを使って削除APIにリクエストを送る
// 削除処理を実行するボタンを作成する

"use client";

export function DeletePostButton({postId}:{postId:number}){
    async function deletePost(){
        const response = await fetch(`/api/posts/delete/${postId}`, {
            method: "DELETE",
        });

        if(response.ok){
            console.log("削除成功");
        }
        window.location.reload();
    }
    return(
        <button onClick={deletePost}>投稿削除</button>
    )
}