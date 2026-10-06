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