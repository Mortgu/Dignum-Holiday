import prisma from "@/app/lib/prisma.js";
import { NextResponse } from "next/server";

/**
 * /api/calendar
 *
 * @param request
 * @returns {Promise<void>}
 * @constructor
 */
export async function POST(request) {
    const data = await request.json();
    const holiday = await prisma.holidays.create({
        data: data
    });

    return NextResponse.json(holiday);
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