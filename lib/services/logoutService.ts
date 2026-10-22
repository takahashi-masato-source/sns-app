//cookieからsessionIdを取得
//logoutRepository()にsessionIdを送ってsessionテーブルを削除
//cookie内に保存しているsessionIdを削除
//削除されたという情報を返す

import { cookies } from "next/headers";
import { logoutRepository } from "@/lib/repositories/logoutRepository";

export async function logoutService(){
    const cookiestore = await cookies();
    const sessionId = cookiestore.get("sessionId")?.value;

    if (!sessionId) {
        throw new Error("ログイン情報がない");
    }
    
    const session = await logoutRepository(sessionId);
    
    if(!session){
        throw new Error("sessionがない");
    }

    cookiestore.delete("sessionId");

    return session;
}