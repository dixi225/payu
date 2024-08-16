import { NextRequest, NextResponse } from "next/server";
import prisma from "@repo/db/client";
const client=new prisma.PrismaClient()


export const GET=(req:NextRequest)=>{
    return NextResponse.json({
        "Message":"Prisma working"
    })
}