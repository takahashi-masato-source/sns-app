import { prisma } from "@/lib/prisma";

export async function logoutRepository(
    sessionId:string
){
    const session = await prisma.session.delete({
        where:{
            id:sessionId,
        }
    })

    return session;
}