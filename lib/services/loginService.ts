import { loginResoritory } from "@/lib/repositories/loginResoritory";
import { sessionRepository } from "@/lib/repositories/sessionRepository";
import { compare } from 'bcryptjs';
import { cookies } from "next/headers";

export async function loginService(
    mail:string,
    password:string
){
    const user = await loginResoritory(mail);

    if(!user){
        throw new Error("アカウントが見つからない");
    }

    const isValid = await compare(password,user.passwordHash);

    if (!isValid) {
        throw new Error("パスワードが違う");
    }

    const session = await sessionRepository(user.id);

    const cookiestore = await cookies();
    cookiestore.set("sessionId", session.id);

    return user;

}
