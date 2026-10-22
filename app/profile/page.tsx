// ログイン中のユーザー情報を取得する
// ここで取得したuser.idを使って、プロフィールAPIからプロフィール情報を取得する
// 現在は自分のプロフィールを表示するため、同じUserを再取得している
// api/profile/[id] は将来的に他のユーザーのプロフィール表示にも使える
// プロフィールAPIから受け取ったpostデータをmapで一覧表示

"use client";
import Link from 'next/link'

import { useState, useEffect } from "react";

type Post = {
    id: number;
    content: string;
    userId: number;
    createdAt: string;
};


type Profile = {
    id: number;
    name: string;
    mail: string;
    bio: string;
    post:Post[];
};



export default function Profile() {
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        async function getProfile() {
            const sessionResponse = await fetch("/api/session");
            const user = await sessionResponse.json();

            if (!sessionResponse.ok) {
                return;
            }

            const profileResponse = await fetch(`/api/profile/${user.id}`);
            const userProfile = await profileResponse.json();

            setProfile(userProfile);
        }

        getProfile();
    }, []);

    return (
        <main>
            <h1>プロフィール画面</h1>

            {profile && (
                <div>
                    <p>name</p>
                    <p>{profile.name}</p>
                    <p>mail</p>
                    <p>{profile.mail}</p>
                    <p>id</p>
                    <p>{profile.id}</p>
                    <p>bio</p>
                    <p>{profile.bio}</p>
                    <Link href={"/profileEdit"}>編集</Link>
                    <h2>投稿一覧</h2>
                    {
                        profile.post.map((post) => (
                        <div key={post.id}>
                            <p>{post.content}</p>
                            <p>{post.createdAt}</p>
                        </div>
                    ))
                    }
                </div>                
            )}
        </main>
    );
}