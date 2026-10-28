//getSessionService()でuserデータを取得して返す

import { getSessionService } from "@/lib/services/getSessionService";
import { NextResponse } from "next/server";

export async function GET(){
    const user = await getSessionService();

    if(!user){
        return NextResponse.json(
            {message:"ログイン情報がない"},
            {status:401}
        )
    }

    return NextResponse.json(user);
}