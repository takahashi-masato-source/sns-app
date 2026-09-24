"use client"
import{useState} from "react";

export default function Logout(){
    async function handleLogout(){
        const response = await fetch("/api/session",{
            method:"DELETE",
        })
        const data = await response.json();

        console.log(data);
    }
    return(
        <main>
            <button onClick={handleLogout}>ログアウト</button>
        </main>
    )
}