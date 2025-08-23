import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import jsonwebtoken from 'jsonwebtoken';

const mockUsers = [
    { id: 1, username: 'mock', password: '$2b$10$EgK.eBWg6jsqMm/1qNBPfu/2wexUEaQZS/vOeuS2aVpYhzj6kmpiO' }
];

export async function POST(request) {
    const { username, password } = await request.json();

    const user = mockUsers.find(u => u.username === username);

    if (!user) {
        return NextResponse.json({
            error: 'User dose not exists!'
        }, { status: 401 });
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
        return NextResponse.json({
            error: 'Incorrect password!'
        }, { status: 401 });
    }

    const token = jsonwebtoken.sign(
        { uid: user.id, username: user.username },
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