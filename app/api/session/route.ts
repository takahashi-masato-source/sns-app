//userデータを取得して返す
//取得に失敗した場合はエラーレスポンスを返す

import { NextResponse } from "next/server";
import { getSessionService } from "@/lib/services/getSessionService";

export async function GET(){
    try{
        const user = await getSessionService();

        return NextResponse.json(user);
    }catch(error){
        return NextResponse.json(
            {message:"ログイン情報の取得に失敗"},
            {status:500}
        )
    }
    
}