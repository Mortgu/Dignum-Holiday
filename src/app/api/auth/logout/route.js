import { NextResponse } from "next/server";

export async function POST(request) {
    const response = NextResponse.json({
        message: 'logout'
    });

    response.cookies.delete('authentication');

    return response;
}