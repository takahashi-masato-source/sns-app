//post.idをもらってそれに合うものをcommentテーブルから探す
//それらを表示する
//commentをdeleteするボタンを作る

import { prisma } from "@/lib/prisma";
import { DeleteCommentButton } from "./DeleteCommentButton";

export async function CommentViews(
    {postId}:{postId:number}
){
    const comments = await prisma.comment.findMany({
        where:{
            postId:postId,
        },
        orderBy:{
            createdAt:"desc",
        },
        include:{
            user:true
        }
    });

    return(
        <main>
            {
                comments.map((comment)=>{
                    return(
                        <div key={comment.id}>
                            <p>ユーザーネーム:{comment.user.name}</p>
                            <p>{comment.content}</p>
                            <p>{comment.createdAt.toLocaleDateString()}</p>
                            <DeleteCommentButton commentId={comment.id}/>
                        </div>
                     )
                 })
            }
        </main>
    )
}