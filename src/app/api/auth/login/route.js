import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { SignJWT } from "jose";

import client from '@/app/utils/db';
import { config, JWT_SECRET } from "@/config";
import permissions from "@/permissions";
import roles from "@/roles";

export async function POST(request) {
    let {username, password} = await request.json();

    username = username.toLowerCase();

    let matches;

    try {
        matches = await client.query("SELECT users.id, users.role, users.name, users.password, users.email, roles.name as role FROM users JOIN roles ON users.role = roles.id WHERE users.name=$1;", [username]);
    } catch (exception) {
        console.log(exception)
        return NextResponse.json({
            error: 'Failed to fetch data from database!'
        }, {status: 500});
    }

    if (matches.rowCount === 0) {
        return NextResponse.json({
            error: 'User dose not exists!'
        }, {status: 401});
    }
    const user = matches.rows[0];

    if (!roles[user.role].includes('auth')) {
        return NextResponse.json({
            message: 'Error! User is not allowed to authenticate!'
        }, { status: 403 });
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
        return NextResponse.json({
            error: 'Incorrect password!'
        }, { status: 401 });
    }

    const token = await new SignJWT({
        uid: user.id, name: user.name, email: user.email, role: user.role
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