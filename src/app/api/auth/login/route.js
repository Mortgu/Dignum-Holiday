import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import jsonwebtoken from 'jsonwebtoken';
import client from '../../../utils/db.js';
import { SignJWT } from "jose";
import { createSecretKey } from 'crypto';

const mockUsers = [
    {id: 1, username: 'mock', password: '$2b$10$EgK.eBWg6jsqMm/1qNBPfu/2wexUEaQZS/vOeuS2aVpYhzj6kmpiO'}
];

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(request) {
    const {username, password} = await request.json();

    const matches = await client.query("SELECT users.id, users.name as name, users.email, users.password, roles.name as role FROM users JOIN roles ON users.role = roles.id WHERE users.name = $1;", [username]);

    if (matches.rowCount === 0) {
        return NextResponse.json({
            error: 'User dose not exists!'
        }, {status: 401});
    }
    const user = matches.rows[0];
    console.log(matches.rows);

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
        return NextResponse.json({
            error: 'Incorrect password!'
        }, {status: 401});
    }

    const token = await new SignJWT({
        id: user.id, name: user.name, email: user.email, role: user.role
    }).setProtectedHeader({
        alg: 'HS256'
    }).setIssuedAt().setIssuer(process.env.JWT_ISSUER)
        .setAudience(process.env.JWT_AUDIENCE)
        .setExpirationTime(process.env.JWT_EXPIRATION_TIME)
        .sign(SECRET);

    const response = NextResponse.json({message: 'Login successful'});

    response.cookies.set('authentication', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: Number(process.env.JWT_EXPIRES_IN),
        path: '/'
    });

    return response;
}