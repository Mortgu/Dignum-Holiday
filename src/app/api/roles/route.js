import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma.js";

export async function POST(request) {
    const roles = await prisma.roles.findMany({
        include: {RolePermission: true}
    });

    return NextResponse.json(roles, { status: 201 });
}