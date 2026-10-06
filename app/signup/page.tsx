"use client";

import { FormEvent, useState } from "react"

export default function SignUp(){
    const[name,setName]=useState("");
    const[mail,setMail]=useState("");
    const[password,setPassword]=useState("");

    async function handleSignUp(e: FormEvent<HTMLFormElement>){
        e.preventDefault();

        const response = await fetch("/api/users",{
            method:"POST",
            headers:
            {"Content-Type":"application/json"},
            body:JSON.stringify({
                name:name,
                mail:mail,
                password:password,
            })
        })

        const data = await response.json();

        console.log(data);
    }
    return(
        <main>
            <h1>アカウント作成</h1>
            <form onSubmit={handleSignUp}>
                <div>
                    <label>
                        名前
                        <input name="name" onChange={(e)=>setName(e.target.value)}/>
                    </label>
                </div>
                <div>
                    <label>
                        メールアドレス
                        <input name="mail" onChange={(e)=>setMail(e.target.value)}/>
                    </label>
                </div>
                <div>
                    <label>
                        パスワード
                        <input name="password" onChange={(e)=>setPassword(e.target.value)} type="password"/>
                    </label>
                </div>
                <button type="submit">アカウント作成</button>
            </form>
        </main>
    )
}