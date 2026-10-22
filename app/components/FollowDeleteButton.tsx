//followを解除するためのボタンを作ったコンポーネント関数
//フォローしている相手のuser.idをもらってそのIdをフォロー削除APIに送る

"use client";

export function FollowDeleteButton(
    {userId}:{userId:number}
){
    async function handleFollowDelete(){
        const response = await fetch(`/api/users/${userId}/followDelete`,{
            method:"DELETE",
        })
        const data = await response.json();

        console.log(data);
    }
    return(
        <main>
            <button onClick={handleFollowDelete}>フォローを解除する</button>
        </main>
    )
}