//cookieからsessionIdを取得してログイン中のuserデータを取得する
//getSessionRepository()にsessionIdを渡してsessionテーブルからログイン中のsessionを取得
//sessionのuserIdからログイン中のuserのidを取得
//getUserRepository()にuserIdを渡してuserテーブルからログイン中のuserデータを取得
//userデータを返す
//要するにログインされているuserデータを返すもの

import { getSessionRepository } from "../repositories/getSessionRepository";
import { getUserRepository } from "../repositories/getUserRepository";
import { cookies } from "next/headers";

export async function getSessionService(){
    const cookiestore = await cookies();
    const sessionId = cookiestore.get("sessionId")?.value;

    if (!sessionId) {
        return null;
    }

    const session = await getSessionRepository(sessionId);

    if (!session) {
        return null;
    }

    const userId = session.userId;

    const user = await getUserRepository(userId);

    return user;
}