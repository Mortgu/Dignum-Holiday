import { parseAuthCookie, verifyToken } from "@/app/utils/jwt";
import { NextResponse } from "next/server";
import { jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

import permissions from "./permissions";
import roles from "./roles";

const authenticate = async (token) => {
    return await jwtVerify(token, SECRET, {
        issuer: process.env.JWT_ISSUER, audience: process.env.JWT_AUDIENCE, 
    });
}

export async function middleware(request) {
    const token = parseAuthCookie(request.headers.get('cookie'))
    const url = request.nextUrl.pathname;

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        const { payload } = await authenticate(token);

        if (!payload) {
            const response = NextResponse.redirect(new URL('/login', request.url));
            response.cookies.delete('authentication');
            return response;
        }

        return NextResponse.next();
    } catch (exception) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

// Score of the middleware
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login).*)']
};

