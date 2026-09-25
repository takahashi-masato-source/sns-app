"use client";
import{useState} from "react";
import Link from "next/link";

export default function Login() {
    const[mail,setMail]=useState("");
    const[password,setPassword]=useState("");

    async function handleLogin(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        const response = await fetch("/api/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                mail:mail,
                password:password,
            }),
        });

        const data = await response.json();

        console.log(data);
    }

  return (
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
                    <input name="password" onChange={(e)=>setPassword(e.target.value)}/>
                </label>
            </div>
            <button type="submit">ログイン</button>
        </form>

        <div className="flex flex-col">
            <Link href={"/"}>登録画面はこちら</Link>
            <Link href={"/record"}>score入力画面はこちら</Link>
            <Link href={"/logout"}>ログアウトはこちら</Link>
        </div>
    </main>
  )
}