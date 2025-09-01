import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma.js";

export async function PATCH(request, { params }) {
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

export async function DELETE(request, { params }) {
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