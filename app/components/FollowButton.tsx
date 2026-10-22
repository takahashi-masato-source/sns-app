// 他のUserをFollowするためのボタンをコンポーネント関数にしたもの
// Followしたい相手のUserのidを受け取る

"use client";

export function FollowButton(
    {userId}:{userId:number}
){
    async function handleFollow(){
        const response = await fetch(`/api/users/${userId}/follow`,{
            method:"POST",
        })

        const data = await response.json();

        console.log(data);
    }
    return(
        <main>
            <button onClick={handleFollow}>フォローする</button>
        </main>
    )
}