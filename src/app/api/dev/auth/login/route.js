import { SignJWT } from "jose";
import { NextResponse } from "next/server";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(request) {
    const { username, password } = await request.json();

    const token = await new SignJWT({
        uid: 0, name: 'mock', email: 'mock@test.de', role: 'admin'
    }).setProtectedHeader({
        alg: 'HS256'
    }).setIssuedAt().setIssuer(process.env.JWT_ISSUER)
        .setAudience(process.env.JWT_AUDIENCE)
        .setExpirationTime(process.env.JWT_EXPIRATION_TIME)
        .sign(SECRET);

    const response = NextResponse.json({
        message: 'Login successfully'
    });

    response.cookies.set('authentication', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: Number(process.env.JWT_EXPIRES_IN),
        path: '/'
    });

    return response;
}