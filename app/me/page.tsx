"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Me(){
    const[ mail,setMail]=useState("");
    const router=useRouter();

    useEffect(()=>{
        async function getUser(){
            const response = await fetch("/api/session");
            const data = await response.json();
            setMail(data.mail);
        }
        getUser();
    },[]);
    async function handleLogout(){
        const response = await fetch("/api/session",{
            method:"DELETE",
        })
        router.push("/login")

    }


    return(
        <main>
            <div>
                <h1>メインメニュー</h1>
                <div>
                    <label>
                        mail
                        <p>{mail}</p>
                    </label>
                </div>
            </div>

            <div className="flex flex-col">
                <Link href={"/record"}>記録一覧へ</Link>
            </div>
            <button onClick={handleLogout}>ログアウト</button>
        </main>
    )
}