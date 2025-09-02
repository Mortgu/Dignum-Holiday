import prisma from "@/app/lib/prisma.js";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
    const { id } = await params;

    try {
        const data = await prisma.holidays.deleteMany({
            where: { id: parseInt(id) }
        });

        return NextResponse.json(data);
    } catch (exception) {
        return NextResponse.json({
            error: exception.message
        });
    }
}