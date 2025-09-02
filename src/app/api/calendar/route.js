import prisma from "@/app/lib/prisma.js";
import { NextResponse } from "next/server";
import { checkAuthentication } from "@/app/lib/authentication.js";
import { checkPermission } from "@/app/lib/permissions.js";

/**
 * /api/calendar
 *
 * @param request
 * @returns {Promise<void>}
 * @constructor
 */
export async function POST(request) {
    const { payload } = await checkAuthentication();

    if (!payload) {
        return NextResponse.json({
            error: 'You are not authenticated!'
        }, { status: 403 });
    }

    const hasPermission = await checkPermission(payload.role, "calendar:create");

    if (!hasPermission) {
        return NextResponse.json({
            error: 'You are not allowed to perform this action!'
        }, { status: 403 });
    }

    const data = await request.json();

    try {
        const holiday = await prisma.holidays.create({
            data: {...data, user: payload.uid }
        });

        return NextResponse.json(holiday);
    } catch (exception) {
        return NextResponse.json({
            error: 'Something went wrong trying to insert new event!'
        }, { status: 500 });
    }
}

/**
 *
 * @param request
 * @returns {Promise<void>}
 * @constructor
 */
export async function GET(request) {
    const holidays = await prisma.holidays.findMany();
    return NextResponse.json(holidays);
}

