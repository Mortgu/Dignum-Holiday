import { NextResponse } from "next/server";

export function POST(request) {
    console.log('test')

    return NextResponse.next();
}