'use server'

import { SignupFormSchema } from '@/app/lib/definitions';
import bcrypt from 'bcryptjs';
import { createSession, deleteSession } from '@/app/lib/session';

import client from '@/app/lib/db';
import { redirect } from 'next/navigation';

export async function login(state, formData) {
    const { email, password } = formData;
    
    const hashedPassword = await bcrypt.hash(password, 10);

}

export async function signup(state, formData) {
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // 2. Prepare data for insertion into database
    const { name, email, password } = validatedFields.data;
    // e.g. Hash the user's password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Insert the user into the database or call an Library API
    const data = await insertUser(name, email, hashedPassword);

    const user = data.rows[0];

    if (!user) {
        return {
            message: 'An error occurred while creating your account.',
        }
    }

    // 4. Create user session
    await createSession(user.id);

    // 5. Redirect user
    redirect('/profile');
}

async function insertUser(name, email, hashedPassword) {
    return client.query(`INSERT INTO users (name, email, password) VALUES
        ('${name}', '${email}', '${hashedPassword}') RETURNING id, name, email`);
}

export async function logout() {
    await deleteSession();
    redirect('/');
}