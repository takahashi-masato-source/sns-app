//user.idを受け取りそのidを使ってSessionを作成して返す

import { prisma } from "../prisma";
import crypto from "crypto";

export async function sessionRepository(
    id:number
){
    const session = await prisma.session.create({
        data:{
            id:crypto.randomUUID(),
            userId:id,

        }
    })

    return session;
}