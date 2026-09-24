"use client";
import{useState} from "react";
import Link from "next/link";

export default function Home() {
const[mail,setMail]=useState("");
const[password,SetPassword]=useState("");

  async function handleSubmit(){
    const response = await fetch("/api/users",{
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
    
    return (
    <main>
      <h1>登録画面</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            mail
            <input name="mail" onChange={(e)=>setMail(e.target.value)}/>
          </label>
        </div>
        <div>
          <label>
            password
            <input name="password" onChange={(e)=>SetPassword(e.target.value)}/>
          </label>
        </div>
        <button type="submit">送信</button>
      </form>
      <Link href="/login">ログインはこちら</Link>
    </main>
  );
}