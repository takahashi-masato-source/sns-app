"use client";

import { useState,useEffect } from "react"

export default function GetUser(){
    const [userData, setUserData] = useState<any>(null);

    useEffect(()=>{
        async function getUserData(){
            const response = await fetch("/api/session");

            const user = await response.json();

            setUserData(user);
        }
        getUserData()
    },[]);
    async function handleDelete(){
        const response = await fetch("/api/logout",{
            method:"delete",
        })

        if (response.ok) {
            setUserData(null);
        }
    }
    return(
        <main>
            <h1>User Data</h1>
            {userData ? (
                <>
                    <label>
                        name
                        <p>{userData.name}</p>
                    </label>
                    <label>
                        mail
                        <p>{userData.mail}</p>
                    </label>
                    <p>ログアウト画面</p>
                <button onClick={handleDelete}>ログアウト</button>
                </>
            ) : (
                <p>ログインしていません</p>
            )}
        </main>
    )
}