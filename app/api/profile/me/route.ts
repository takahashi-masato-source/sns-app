import { getSessionService } from "@/lib/services/getSessionService";
import { NextResponse } from "next/server";

export async function GET(){
    const user = await getSessionService();

    return NextResponse.json(user);
}