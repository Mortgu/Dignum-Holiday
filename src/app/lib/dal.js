import 'server-only'

import { cookies } from 'next/headers';
import { decrypt } from '@/app/lib/session';
import { cache } from 'react';
import client from '@/app/lib/db';
import { redirect } from 'next/navigation';

export const verifySession = cache(async () => {
    const cookie = (await cookies()).get('session')?.value;
    const session = await decrypt(cookie);

    if (!session || !session.userId) {
        return { isAuth: false, userId: null };
    }

    return { isAuth: true, userId: session.userId };
});

export const getUser = cache(async () => {
    const session = await verifySession()
    if (!session) return null

    try {
        //  where: eq(users.id, session.userId),
        const data = await client.query(`SELECT id, name, email WHERE id=${session.userId}`);
        console.log(data);

        const user = data[0]

        return user
    } catch (error) {
        console.log('Failed to fetch user')
        return null
    }
});