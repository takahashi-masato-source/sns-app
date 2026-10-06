//cookieからsessionIdを取得してログイン中のuserデータを取得する
//そのuserデータを返す

import { getSessionRepository } from "../repositories/getSessionRepository";
import { getUserRepository } from "../repositories/getUserRepository";
import { cookies } from "next/headers";

export async function getSessionService(){
    const cookiestore = await cookies();
    const sessionId = cookiestore.get("sessionId")?.value;

    if (!sessionId) {
        throw new Error("ログイン情報がない");
    }

    const session = await getSessionRepository(sessionId);

    if(!session){
        throw new Error("sessionがない");
    }

    const userId=session.userId;

    const user = await getUserRepository(userId);

    return user;

}