import { NextResponse } from "next/server";
import { withAuthorization } from "@/app/lib/authentication.js";
import prisma from "@/app/lib/prisma.js";

/** CREATING USERS */
const handler = async (body, context, user) => {
    const fields = await body.json();
    console.log(fields);

    try {
        const createdUser = await prisma.users.create({
            data: { ...fields }
        });

        return NextResponse.json(createdUser);
    } catch (exception) {
        console.error(exception.message);
        return NextResponse.json({
            error: 'Something went wrong trying to insert new user!'
        }, { status: 500 });
    }
}

export const POST = withAuthorization(handler, 'users:create');
