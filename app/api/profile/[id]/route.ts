//URLからuser.idをもらってuserテーブルからuser.idに合う情報を取得して返す
//includeしてpostのuserIdが同じものも返す

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const profile = await prisma.user.findUnique({
        where: {
            id: Number(id),
        },
        select: {
        id: true,
        name: true,
        mail: true,
        bio: true,
        post: true,
            _count: {
                select: {
                    followers: true,
                    following: true,
                }
            }
        },
        // passwordhashを返さないようにする
        // selectとincludeは同時に使えない
    });
    return NextResponse.json(profile);
}