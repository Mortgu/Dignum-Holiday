import { NextResponse } from "next/server";
import { parseAuthCookie, verifyToken } from "@/app/utils/jwt";

export async function middleware(request) {
    // 1. Get the jsonwebtoken from the cookie
    const token = parseAuthCookie(request.headers.get('cookie'));

    // 2. Define protected routes
    const isProtectedRoute = !request.nextUrl.pathname.startsWith('/login');

    if (isProtectedRoute) {
        // 3. No token provided: Redirect to the login page
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // 4. Verify the token
        const payload = verifyToken(token);
        if (!payload) {
            // The token is invalid or expired, clear the invalid Cookie
            const response = NextResponse.redirect(new URL('/login', request.url));
            response.cookies.delete('authentication');
            return response;
        }

        // 5. Verification passed: Attach user information to the request context
    } else {
        if (token && verifyToken(token)) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    // 7. Allow the request to continue
    return NextResponse.next();

    const response = NextResponse.next();
    return response;
}

// Score of the middleware
export const config = {
    matcher: ['/((?!api|_next/static||_next/image|favicon.ico).*)']
};