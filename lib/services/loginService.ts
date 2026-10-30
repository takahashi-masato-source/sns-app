//受けとったmailとpasswordを使ってログインをする
//mailをloginRepositoryに渡してuserテーブルからアカウント取得を行う
//アカウント取得後はpasswordと正誤確認をする
//正しい場合sessionRepositoryでsessionテーブルをcreateする
//SessionIDをCookieに保存する
//UserをRouteへ返す

import { loginResoritory } from "@/lib/repositories/loginResoritory";
import { sessionRepository } from "@/lib/repositories/sessionRepository";
import { compare } from 'bcryptjs';
import { cookies } from "next/headers";

export async function loginService(
    mail:string,
    password:string
){
    if (!mail) {
        throw new Error("mailがない");
    }

    if (!password) {
        throw new Error("passwordがない");
    }
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
