import { NextResponse } from "next/server";
import { withAuth } from "@/lib/auth/wrappers.js";

import prisma from "@/app/lib/prisma.js";

/** MODIFY USER | [POST] /api/users/[id] */
const modifyUser = async (body, context, user) => {
    const { id } = await context.params;
    const fields = await body.json();

    try {
        const updatedUser = await prisma.users.updateMany({
            where: { id: parseInt(id) }, data: {
                ...fields
            }
        });

        return NextResponse.json(updatedUser);
    } catch (exception) {
        return NextResponse.json({
            error: 'Something went wrong trying to update user!',
            exception: exception
        }, { status: 500 });
    }
}

export const POST = withAuth(modifyUser, 'admin:users:modify');

const getUser = async (body, context, user) => {
    const { id } = await context.params;

    try {
        const data = await prisma.users.findFirst({
            where: { id: parseInt(id) }, include: { roleRelation: true }
        });

        return NextResponse.json(data);
    } catch (exception) {
        return NextResponse.json({
            error: 'Something went wrong trying to fetch user!'
        }, { status: 500 });
    }
}

export const GET = withAuth(getUser, 'admin:users:view');


const deleteUser = async (body, context, user) => {
    const { id } = await context.params;

    try {
        const deleteUser = await prisma.users.deleteMany({
            where: { id: parseInt(id) }
        });

        return NextResponse.json(deleteUser);
    } catch (exception) {
        return NextResponse.json({
            error: 'Something went wrong trying to delete user!'
        }, { status: 500 });
    }
}

export const DELETE = withAuth(deleteUser, 'admin:users:delete');