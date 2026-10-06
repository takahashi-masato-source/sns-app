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
        select: {
            id: true,
            name: true,
            mail: true,
            bio:true,
        },
    });

    return NextResponse.json(profile);
}