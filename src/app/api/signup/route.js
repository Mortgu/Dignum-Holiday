import client from '@/app/lib/database';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    const {name, email, password} = await req.json();

    if (!name || !email || !password) {
        return new Response(JSON.stringify({
            error: "Missing fields!"
        }), {status: 400});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const result = await client.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
            [name, email, hashedPassword]
        );

        return new Response(JSON.stringify(result.rows[0]), {status: 201});
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({
            error: "User already exists!"
        }), {status: 400});
    }
}