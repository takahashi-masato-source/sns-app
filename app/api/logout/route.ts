
import { NextResponse } from "next/server";
import { logoutService } from "@/lib/services/logoutService";

export async function DELETE() {
    
    try{
        const logout = await logoutService();

        return NextResponse.json(logout);
    }catch(error){
        return NextResponse.json(
            {error:"ログアウト失敗"},
            {status:500}
        )
    }
}