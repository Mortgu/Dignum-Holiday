import { NextResponse } from "next/server";
import { withAuth } from "@/lib/auth/wrappers.js";

const handler = async (request, context, {user}) => {
    const { roleName, list } = await request.json();

    try {
        const createRoleData = await prisma.roles.create({
            data: { name: roleName }
        });

        for (const index in list) {
            await prisma.role_permissions.create({
                data: { role: createRoleData.id, permission: parseInt(list[index]) }
            });
        }

        const responseData = await prisma.roles.findMany({
            where: { id: createRoleData.id }, include: { RolePermission: true }
        })

        return NextResponse.json(responseData[0]);
    } catch (exception) {
        return NextResponse.json({
            error: 'Something went wrong trying to insert new role!'
        }, { status: 500 });
    }
}

export const POST = withAuth(handler, 'admin:roles:create');