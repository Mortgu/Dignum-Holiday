import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma.js";
import { checkPermission } from "@/app/lib/permissions.js";
import { checkAuthentication, withAuthorization } from "@/app/lib/authentication.js";

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

export const POST = withAuthorization(modifyUser, 'users:modify');

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

export const GET = withAuthorization(getUser, 'users:view');


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

export const DELETE = withAuthorization(deleteUser, 'users:delete');