import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma.js";
import { withAuth } from "@/lib/auth/wrappers.js";

async function patchUser(request, { params }) {
    const { id } = await params;
    const { permission, checked } = await request.json();

    if (checked) {
        await prisma.role_permissions.create({
            data: { role: parseInt(id), permission: permission.id }
        });

        return NextResponse.json({
            message: 'Successfully added permission to role.'
        }, { status: 200 });
    } else {
        await prisma.role_permissions.deleteMany({
            where: { role: parseInt(id), permission: permission.id }
        });

        return NextResponse.json({
            message: 'Successfully removed permission from role.'
        }, { status: 200 });
    }
}

export const PATCH = withAuth(patchUser, 'admin:users:modify');

async function deleteUser(request, { params }) {
    const { id } = await params;

    try {
        await prisma.roles.delete({
            where: { id: parseInt(id) }
        });

        return NextResponse.json({
            message: 'Successfully deleted role!'
        });
    } catch (exception) {
        return NextResponse.json({
            error: 'Failed to delete Role!'
        }, { status: 500 });
    }

}

export const DELETE = withAuth(deleteUser, 'admin:users:delete');