import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { JWT_SECRET, mockUser, config } from "@/config";

export async function POST(request) {

    const token = await new SignJWT(mockUser)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt().setIssuer(process.env.JWT_ISSUER)
        .setAudience(process.env.JWT_AUDIENCE)
        .setExpirationTime(process.env.JWT_EXPIRATION_TIME)
        .sign(JWT_SECRET);

    const response = NextResponse.json({
        message: 'Login successfully'
    });

    response.cookies.set(config.authCookieName, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: Number(process.env.JWT_EXPIRES_IN),
        path: '/'
    });

    return response;
}