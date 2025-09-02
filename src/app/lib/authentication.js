import { jwtVerify } from "jose";
import { checkPermission } from "@/app/lib/permissions";
import { parseAuthCookie } from "@/app/utils/jwt";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { JWT_SECRET } from "@/config";
import prisma from "@/app/lib/prisma.js";

export async function requirePermission(request, response, permission) {
    const headersList = await headers();
    const token = parseAuthCookie(headersList.get('cookie'));

    if (!token) {
        response.status(401).json({
            error: 'Missing token!'
        });
        return null;
    }

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET, {
            issuer: process.env.JWT_ISSUER, audience: process.env.JWT_AUDIENCE,
        });

        const hasPermission = await checkPermission(payload.role, permission);

        if (!hasPermission) {
            NextResponse.json({ error: 'er' }, { status: 403 });
            return null;
        }

        return payload;
    } catch (exception) {
        response.status(401).json({ error: 'Invalid token' });
        return null;
    }
}

export function withPermission(handler, permission) {
    return async (request, response) => {
        const user = await requirePermission(request, response, permission);
        if (!user) return <>withPermission(): Failed</>;
        return handler(request, response, user);
    }
}

export function withAuthorization(handler, permission) {
    return async (request, context) => {
        const { payload } = await checkAuthentication();

        if (!payload) {
            return NextResponse.json({
                error: 'Authorization Required!'
            }, { status: 401 });
        }

        let user;

        try {
            user = await prisma.users.findFirst({
                where: { id: payload.uid }, include: { roleRelation: true }
            });
        } catch (exception) {
            return NextResponse.json({});
        }

        const hasPermission = await checkPermission(payload.role, permission);
        console.log(hasPermission)

        if (!hasPermission ) {
            return NextResponse.json({
                error: 'Forbidden!'
            }, { status: 403 });
        }

        return handler(request, context, user);
    }
}

export async function checkAuthentication() {
    const headersList = await headers();
    const token = parseAuthCookie(headersList.get('cookie'));

    if (!token) return null;

    try {
        return await jwtVerify(token, JWT_SECRET, {
            issuer: process.env.JWT_ISSUER, audience: process.env.JWT_AUDIENCE,
        });
    } catch (exception) {
        return null;
    }
}

