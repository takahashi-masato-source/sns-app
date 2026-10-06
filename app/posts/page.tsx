import { prisma } from "@/lib/prisma"
import { DeletePostButton } from "../components/DeletePostButton";
import { PatchPostButton } from "../components/PatchPostButton";

export default async function Posts(){
    const posts = await prisma.post.findMany({
        orderBy:{
            createdAt:"desc",
        },
        include:{
            user:true,
        }
    });
    return(
        <main>
            <h1>投稿一覧</h1>
            {
                posts.map((post)=>{
                    return(
                        <div key={post.id}>
                            <p>{post.user.name}</p>
                            <p>{post.content}</p>
                            <p>{post.createdAt.toLocaleDateString()}</p>
                            <DeletePostButton postId={post.id}/>
                            <PatchPostButton postId={post.id}/>
                        </div>
                    )
                })
            }
        </main>
    )
}