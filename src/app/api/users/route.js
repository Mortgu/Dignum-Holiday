import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma.js";
import { checkPermission } from "@/app/lib/permissions.js";
import { checkAuthentication } from "@/app/lib/authentication.js";

/** CREATING USERS */
export async function POST(request) {
    const data = await request.json();
    const { payload } = await checkAuthentication();

    if (!payload) {
        return NextResponse.json({
            error: 'You are not authenticated!'
        }, { status: 403 });
    }

    if (!data) {
        return NextResponse.json({
            error: 'Failed to receive body.'
        }, { status: 500 });
    }

    const hasPermission = await checkPermission(payload.role.id, 'users:create');

    if (!hasPermission) {
        return NextResponse.json({
            error: 'You are not allowed to perform this action!'
        }, { status: 403 });
    }

    try {
        const userData = await prisma.users.create({
            data: {
                email: data.email,

                firstName: data.firstName,
                lastName: data.lastName,

                workingHours: parseInt(data.workingHours),
                vacationEntitlement: parseInt(data.vacationEntitlement),
                password: data.password,
            }
        });

        return NextResponse.json(userData);
    } catch (exception) {
        console.error(exception.message);
        return NextResponse.json({
            error: 'Something went wrong trying to insert new user!'
        }, { status: 500 });
    }
}