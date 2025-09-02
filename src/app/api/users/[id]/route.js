import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma.js";
import { checkPermission } from "@/app/lib/permissions.js";
import { checkAuthentication } from "@/app/lib/authentication.js";

/** MODIFY USER | [POST] /api/users/[id] */
export async function POST(request, { params }) {
    const fields = await request.json();
    const {payload} = await checkAuthentication();
    const { id } = await params;

    if (!payload) {
        return NextResponse.json({
            error: 'You are not authenticated!'
        }, { status: 403 });
    }

    if (!fields) {
        return NextResponse.json({
            error: 'Failed to receive body.'
        }, { status: 500 });
    }

    const hasPermission = await checkPermission(payload.role, 'users:modify');

    if (!hasPermission) {
        return NextResponse.json({
            error: 'You are not allowed to perform this action!'
        }, { status: 403 });
    }

    const user = await prisma.users.findMany({
        where: { id: parseInt(id) }, include: { roleRelation: true }
    });

    try {
        const data = await prisma.users.updateMany({
            where: { id: parseInt(id) }, data: {
                ...fields
            }
        });

        return NextResponse.json(data);
    } catch (exception) {
        return NextResponse.json({
            error: 'Something went wrong trying to update user fields!'
        }, { status: 500 });
    }
}