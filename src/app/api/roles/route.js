import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma.js";
import { checkPermission } from "@/app/lib/permissions.js";
import { checkAuthentication } from "@/app/lib/authentication.js";

export async function POST(request) {
    const { roleName, list } = await request.json();
    const { payload } = await checkAuthentication();

    if (!payload) {
        return NextResponse.json({
            error: 'You are not authenticated!'
        }, { status: 403 });
    }

    const hasPermission = await checkPermission(payload.role.id, 'roles:create');

    if (!hasPermission) {
        return NextResponse.json({
            error: 'You are not allowed to perform this action!'
        }, { status: 403 });
    }

    let createRoleData;
    try {
        createRoleData = await prisma.roles.create({
            data: {name: roleName},
        })
    } catch (exception) {
        console.error(exception.message);
        return NextResponse.json({
            error: 'Something went wrong trying to insert new role!'
        }, { status: 500 });
    }

    for (const index in list) {
        console.log('insert ' + index + " for " + createRoleData.id);
        await prisma.role_permissions.create({
            data: { role: createRoleData.id, permission: parseInt(list[index]) }
        })

    }

    return NextResponse.json({
        message: '',
    });
}