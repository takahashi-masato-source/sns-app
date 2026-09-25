"use client";
import{useState} from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function RecordId(){
    const params = useParams<{ id: string }>();
    const id = params.id;
    const router = useRouter();

    async function handleEdit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        const formData=new FormData(e.currentTarget);

        const name = formData.get("name");
        const score = formData.get("score");

        const response=await fetch(`/api/record/${id}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                name:name,
                score:score,
            })
        })

        const data = await response.json();
        console.log(data);
        router.push("/record");
    }

    return(
        <main>
            <form onSubmit={handleEdit}>
                <div>
                    name
                    <input name="name" />
                </div>
                <div>
                    score
                    <input name="score" />
                </div>
                <button type="submit">編集完了</button>
            </form>
        </main>
    )
}