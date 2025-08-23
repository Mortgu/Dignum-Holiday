import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import jsonwebtoken from 'jsonwebtoken';
import client from '../../../utils/db.js';

const mockUsers = [
    { id: 1, username: 'mock', password: '$2b$10$EgK.eBWg6jsqMm/1qNBPfu/2wexUEaQZS/vOeuS2aVpYhzj6kmpiO' }
];

export async function POST(request) {
    const { username, password } = await request.json();

    const matches = await client.query("SELECT * FROM users WHERE name=$1", [username]);

    //const user = mockUsers.find(u => u.username === username);

    if (matches.rowCount === 0) {
        return NextResponse.json({
            error: 'User dose not exists!'
        }, { status: 401 });
    }
    const user = matches.rows[0];

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
        return NextResponse.json({
            error: 'Incorrect password!'
        }, { status: 401 });
    }

    const token = jsonwebtoken.sign(
        { uid: user.id, username: user.name },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    )

    const response = NextResponse.json({ message: 'Login successful'});

    response.cookies.set('authentication', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: Number(process.env.JWT_EXPIRES_IN),
        path: '/'
    });

    return response;
}