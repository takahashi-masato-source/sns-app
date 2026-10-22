//mailとpasswordを入力してログインを行う
"use client";

import { FormEvent, useState } from "react"

export default function Login(){
    const[mail,setMail]=useState("");
    const[password,setPassword]=useState("");

    async function handleLogin(e:FormEvent<HTMLFormElement>){
        e.preventDefault();

        const response = await fetch("/api/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                mail:mail,
                password:password,
            })
        })

        const data = await response.json();
        console.log(data);
    }
    return(
        <main>
            <h1>ログイン画面</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>
                        mail
                        <input name="mail" onChange={(e)=>setMail(e.target.value)}/>
                    </label>
                </div>
                <div>
                    <label>
                        password
                        <input name="password" onChange={(e)=>setPassword(e.target.value)} type="password"/>
                    </label>
                </div>
                <button type="submit">ログイン</button>
            </form>
        </main>
    )
}