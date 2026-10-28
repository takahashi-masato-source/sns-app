//投稿一覧から編集ボタンが押された場合に遷移するページ
//post.idを受け取る
//textareaに書かれた内容をcontentに保存してhandleEdit関数を呼ぶbuttonを作る
//投稿の編集を行う
"use client";
import { useRouter } from "next/navigation";
import { use, useEffect, useState} from "react";
export default function PostEdit(
    {params}: {params: Promise<{ id: string }>}
){
    const { id } = use(params);
    const [content, setContent] = useState("");
    const router = useRouter();
    useEffect(()=>{
        async function getContent(){
            const response = await fetch(`/api/users/${id}/getPost`);
            const existingContent = await response.json();
            console.log(existingContent);

            setContent(existingContent);
        }
        getContent();
    },[id])

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
        const data = await response.json();
        console.log(data);
        if(response.ok){
            router.push("/posts");
        }
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