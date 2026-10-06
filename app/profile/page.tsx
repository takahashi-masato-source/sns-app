"use client";
import Link from 'next/link'

import { useState, useEffect } from "react";

type Profile = {
    id: number;
    name: string;
    mail: string;
    bio: string;
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
                </div>                
            )}
        </main>
    );
}