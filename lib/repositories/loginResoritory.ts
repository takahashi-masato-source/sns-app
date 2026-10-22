//mailを受け取りuserテーブルからmailにあうuser情報を取得して返す

import { prisma } from "../prisma";

export async function loginResoritory(
    mail:string,
){
    const user = await prisma.user.findUnique({
        where:{
            mail:mail,
        }
    })

    return user;
}

