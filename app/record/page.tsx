"use client"
import{useState} from "react";

type Record = {
    id: number;
    name: string;
    score: number;
};

export default function Record(){
    const[name,setName]=useState("");
    const[score,setScore]=useState("");
    const[records,setRecords]=useState<Record[]>([]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        const response = await fetch("/api/record",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                name:name,
                score:score
            })
        })
        const data = await response.json()
        console.log(data);
    }
    async function handleClick(){
        const respose = await fetch("/api/record")
        const data = await respose.json();

        setRecords(data);
        console.log(data);
console.log(Array.isArray(data));
    }

    return(
        <main>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        name
                        <input name="name" onChange={(e)=>setName(e.target.value)}/>
                    </label>
                </div>
                <div>
                    score
                    <input name="score" onChange={(e)=>setScore(e.target.value)}/>
                </div>
                <button type="submit">送信</button>
            </form>
            <button onClick={handleClick}>自分のデータを取得</button>
            {
                records.map((record)=>{
                    return(
                        <div key={record.id}>
                            <p>{record.name}</p>
                            <p>{record.score}</p>
                        </div>
                    )
                })
            }
        </main>
    )
}