//posts/page.tsxで使う返信ボタンを作るページ
//返信ボタンが押されたら返信する文章を入力しデータベースに保存する画面に遷移する

"use client";

import{useRouter} from "next/navigation";

export function CommentPostButton(
    {postId}:{postId:number}
){
    const router = useRouter();

    function goToReply(){
        router.push(`/postReply/${postId}/`);
    }
    return(
        <main>
            <button onClick={goToReply}>返信ボタン</button>
        </main>
    )
}