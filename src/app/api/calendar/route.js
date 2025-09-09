import prisma from "@/app/lib/prisma.js";
import { NextResponse } from "next/server";
import { withAuth } from "@/lib/auth/wrappers.js";

async function calendarPost(request, context, { user, payload }) {
    const data = await request.json();

    console.log(data);

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

export const POST = withAuth(calendarPost, 'page:calendar:create');

async function calendarGet(request, context, { user, payload }) {
    const holidays = await prisma.holidays.findMany({
        include: {userId: true}
    });

    return NextResponse.json(holidays);
}

export const GET = withAuth(calendarGet, 'page:calendar:view');