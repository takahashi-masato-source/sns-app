// プロフィール画面の内容を変更するページ
// /api/profile/meからログイン中のUserの現在のnameとbioを取得する
// 取得したnameとbioを編集し、/api/profileにPATCHして更新する


"use client"

import { useEffect, useState } from "react";

type User = {
    id: number;
    name: string;
    mail: string;
    bio: string;
};

export default function ProfileEdit(){
    const [user, setUser] = useState<User | null>(null);

    useEffect(()=>{
        async function getUserData(){
            const response = await fetch("/api/profile/me");
            const user = await response.json();

            setUser(user);
        }
        getUserData();
    },[])

    async function  handleEdit() {
         if (!user) {
             return;
        }
        await fetch('/api/profile',{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                name:user.name,
                bio:user.bio,
            })
        })
        
    }
    return(
        <main>
            <h1>プロフィール編集画面</h1>
           {user && (
                <div>
                    <p>名前</p>
                    <input
                        name="name"
                        value={user.name}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                name: e.target.value
                            })
                        }
                    />

                    <p>自己紹介</p>
                    <textarea
                        name="bio"
                        value={user.bio}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                bio: e.target.value
                            })
                        }
                    />
                    <button onClick={handleEdit}>編集完了</button>
                </div>
             )}
        </main>
    )
}