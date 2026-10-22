//URLからuser.idをもらってuserテーブルからuser.idに合う情報を取得して返す
//includeしてpostのuserIdが同じものも返す

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const profile = await prisma.user.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            post: true,
            _count:{
                select:{
                    followers:true,
                    following:true,
                }
            }
        },
    });
    return NextResponse.json(profile);
}