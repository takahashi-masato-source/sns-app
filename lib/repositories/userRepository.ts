import { prisma } from "@/lib/prisma";

export async function userRepository(
    name: string,
    mail: string,
    hashedPassword: string,
) {

    const user = await prisma.user.create({
        data:{
            name:name,
            mail:mail,
            passwordHash:hashedPassword
        }
    })

    return user;
}