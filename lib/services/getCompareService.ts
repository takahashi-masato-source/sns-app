// ログイン中のuserを取得する
// 指定された投稿を取得する
// user.idとpost.userIdが同じか確認する
// 認可できたらログイン中のuserデータを返す

import { getSessionService } from "./getSessionService";
import { prisma } from "../prisma";

export async function getCompareService(
    id:string,
){
    const user = await getSessionService();
    
    if(!user){
        return null;
    }
    
    const post = await prisma.post.findUnique({
        where:{
            id:Number(id),
        }
    })
    
    if(!post){
        return null;
    }
    
    if(user.id!==post.userId){
        return null;
    }
    return user;
}