import { jwtVerify } from "jose";
import { checkPermission } from "@/app/lib/permissions";
import { parseAuthCookie } from "@/app/utils/jwt";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { JWT_SECRET } from "@/config";

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

        const role = payload.role;
        const hasPermission = await checkPermission(role.id, permission);

        if (!hasPermission) {
            NextResponse.json({ error: 'er' }, { status: 403 });
            return null;
        }

        return payload;
    } catch (exception) {
        console.log(exception);
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

/*export async function checkPermission(request, response, permission) {

}*/