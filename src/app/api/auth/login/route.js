import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { SignJWT } from "jose";

import { config, JWT_SECRET } from "@/config";

import prisma from "@/app/lib/prisma.js";

export async function POST(request) {
    let {email, password} = await request.json();

    email = email.toLowerCase();

    const users = await prisma.users.findMany({
        where: {email: email}, include: {
            roleRelation: true
        }
    });

    if (users.length === 0) {
        return NextResponse.json({
            error: 'User dose not exists!'
        }, {status: 401});
    }

    const user = users[0];

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
        return NextResponse.json({
            error: 'Incorrect password!'
        }, {status: 401});
    }

    const token = await new SignJWT({
        uid: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.roleRelation
    }).setProtectedHeader({alg: 'HS256'})
        .setIssuedAt().setIssuer(process.env.JWT_ISSUER)
        .setAudience(process.env.JWT_AUDIENCE)
        .setExpirationTime(process.env.JWT_EXPIRATION_TIME)
        .sign(JWT_SECRET);

    const response = NextResponse.json({message: user});

    response.cookies.set(config.authCookieName, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: Number(process.env.JWT_EXPIRES_IN),
        path: '/'
    });

    return response;
}