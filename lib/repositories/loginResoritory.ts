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

