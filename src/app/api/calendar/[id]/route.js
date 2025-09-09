import prisma from "@/app/lib/prisma.js";
import { NextResponse } from "next/server";
import { withAuth } from "@/lib/auth/wrappers.js";

async function deleteEntry(request, { params }) {
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

export const DELETE = withAuth(deleteEntry, 'pages:calendar:delete');