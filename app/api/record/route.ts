import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(request:Request){
    const body = await request.json();
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
        },
    });
    if(!session){
        return NextResponse.json(
            {message:"sessionIdがない"},
            {status:401}
        )
    }
    const userId=session.userId;

    const record = await prisma.record.create({
        data:{
            name:body.name,
            score:Number(body.score),
            userId:userId,
        }
    })
    return NextResponse.json(record);

}
export async function GET(){
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
        },
    });
    if(!session){
        return NextResponse.json(
            {message:"sessionIdがない"},
            {status:401}
        )
    }
    const userId=session.userId;

    const records = await prisma.record.findMany({
        where:{
            userId:userId,
        },
        select:{
            id: true,
            name:true,
            score:true
        }
    })
    return NextResponse.json(records);
}