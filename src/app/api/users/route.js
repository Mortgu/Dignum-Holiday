import { NextResponse } from "next/server";
import { withAuthorization } from "@/app/lib/authentication.js";
import prisma from "@/app/lib/prisma.js";

import bcrypt from 'bcryptjs';

/** CREATING USERS | [POST] /api/users/ */
const createUser = async (body, context, user) => {
    const fields = await body.json();
    console.log(fields);

    try {
        // Passwort aus den Feldern extrahieren
        const { password, ...otherFields } = fields;

        // Wenn ein Passwort vorhanden ist, wird es verschlüsselt
        const hashedPassword = password
            ? await bcrypt.hash(password, 10)
            : undefined;

        const createdUser = await prisma.users.create({
            data: {
                ...otherFields,
                password: hashedPassword
            }
        });

        // Passwort aus der Antwort entfernen
        const { password: _, ...userWithoutPassword } = createdUser;
        return NextResponse.json(userWithoutPassword);
    } catch (exception) {
        console.error(exception.message);
        return NextResponse.json({
            error: 'Something went wrong trying to insert new user!'
        }, { status: 500 });
    }
}

export const POST = withAuthorization(createUser, 'users:create');

const getUsers = async (body, context, user) => {
    try {
        const users = await prisma.users.findMany({
            include: {roleRelation: true}, where: { system: false }
        });

        return NextResponse.json(users);
    } catch (exception) {
        return NextResponse.json({
            error: 'Something went wrong trying to fetch users!',
        }, {status: 500});
    }
}

export const GET = withAuthorization(getUsers, 'users:view');