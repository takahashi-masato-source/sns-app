//投稿一覧から編集ボタンが押された場合に遷移
//投稿内容を編集する
"use client";

import { use, useState ,useEffect} from "react";

export default function PostEdit({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const [content, setContent] = useState("");

    async function handlePostEdit(){
        const response = await fetch(`/api/posts/patch/${id}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                content:content,
            })
        })
    }

    return (
        <main>
            <h1>投稿編集画面</h1>

            <div>
                <p>投稿内容</p>

                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <button onClick={handlePostEdit}>保存</button>
            </div>
        </main>
    );
}