//sessionIdをもらってsessionテーブルのsession.idと比較し合うものを返す

import { prisma } from "@/lib/prisma";

export async function getSessionRepository(
    sessionId:string
){
    const session = await prisma.session.findUnique({
        where:{
            id:sessionId,
        }
    })

    return session;

}
