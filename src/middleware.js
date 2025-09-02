import { parseAuthCookie } from "@/app/utils/jwt";
import { NextResponse } from "next/server";
import { jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

const authenticate = async (token) => {
    return await jwtVerify(token, SECRET, {
        issuer: process.env.JWT_ISSUER, audience: process.env.JWT_AUDIENCE,
    });
}

export async function middleware(request) {
    const token = parseAuthCookie(request.headers.get('cookie'));

    if (!token) {
        return NextResponse.json({
            error: 'Authentication required!'
        }, { status: 401 });
    }

    try {
        const {payload} = await authenticate(token);

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

