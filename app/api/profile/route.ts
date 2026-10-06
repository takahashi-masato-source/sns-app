import { prisma } from "@/lib/prisma";
import { getSessionService } from "@/lib/services/getSessionService";
import { NextResponse } from "next/server";

export async function PATCH(
    request:Request,
){
    const body = await request.json();
    const user = await getSessionService();

    if (!user) {
        return NextResponse.json(
            { message: "ログインしてください" },
            { status: 401 }
        );
    }

    const profile = await prisma.user.update({
        where:{
            id:Number(user.id),
        },
        data:{
            name:body.name,
            bio:body.bio,
        }
    })

    return NextResponse.json(profile);
}