import client from '@/app/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req) {
    const { email, password } = await req.json();

    const result = await client.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];

    if (!user) {
        return new Response(JSON.stringify({
            error: "Invalid credentials!"
        }), { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return new Response(JSON.stringify({
            error: "Invalid credentials!"
        }), { status: 401 });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    return new Response(JSON.stringify({ token }), { status: 200 });
} 