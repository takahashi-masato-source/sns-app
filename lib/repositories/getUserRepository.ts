//sessionテーブルのuserIdをもらってそれをもとにuserテーブルからログイン中のuserデータを取得

import { prisma } from "@/lib/prisma";

export async function getUserRepository(
    userId:number
){
    const user = await prisma.user.findUnique({
        where:{
            id:userId,
        }
    })

    return user;
}