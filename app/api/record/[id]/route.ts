import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    console.log("context:", context);

    const { params } = context;

    console.log("params:", params);

    const { id } = await params;

    // 以下そのまま
    const cookiestore = await cookies();
    const sessionId = cookiestore.get("sessionId")?.value;

    if(!sessionId){
        return NextResponse.json(
            {message:"cookieがない"},
            {status:401}
        )
    }

    const session = await prisma.session.findUnique({
        where:{
            id:sessionId,
        }
    })
    if(!session){
        return NextResponse.json(
            {message:"sessionがない"},
            {status:401}
        )
    }
    const userId = session.userId;

    const record = await prisma.record.findUnique({
        where:{
            id:Number(id),
        }
    })

    if(!record){
        return NextResponse.json(
            {message:"recordがない"},
            {status:404}
        )
    }

    if(userId!==record.userId){
        return NextResponse.json(
            {message:"削除認可がない"},
            {status:403}
        )
    }

    const deleteRecord = await prisma.record.delete({
        where:{
            id:record.id
        }
    })

    return NextResponse.json(deleteRecord);
}

export async function PATCH(
    request:Request,
    {params}:{params:Promise<{id:string}>}
){
    const cookiestore = await cookies();
    const sessionId = cookiestore.get("sessionId")?.value;

    if(!sessionId){
        return NextResponse.json(
            {message:"cookieがない"},
            {status:401}
        )
    }
    const session = await prisma.session.findUnique({
        where:{
            id:sessionId,
        }
    })

    if(!session){
        return NextResponse.json(
            {message:"sessionがない"},
            {status:401}
        )
    }

    const userId = session.userId;

    const {id} = await params;
    const body = await request.json();

    const record = await prisma.record.findUnique({
        where:{
            id:Number(id),
        }
    })
    if(!record){
        return NextResponse.json(
            {message:"recordがない"},
            {status:404}
        )
    }
    if(userId!==record.userId){
        return NextResponse.json(
            {message:"認可がない"},
            {status:403}
        )
    }

    const patchRecord = await prisma.record.update({
        where:{
            id:Number(id)
        },
        data:{
            name:body.name,
            score:Number(body.score),
        }
    })

    return NextResponse.json(patchRecord);
}