import { parseAuthCookie } from "@/app/utils/jwt.js";
import { headers } from "next/headers";
import { jwtVerify } from "jose";
import { JWT_SECRET } from "@/config.js";
import { checkPermission } from "@/app/lib/permissions.js";

export class AuthenticationError extends Error {
    constructor(message, status = 401) {
        super(message);
        this.name = 'AuthenticationError';
        this.status = status;
    }
}

export class AuthorizationError extends Error {
    constructor(message, status = 403) {
        super(message);
        this.name = 'AuthorizationError';
        this.status = status;
    }
}

// Core authentication function
export async function authenticate() {
    const headersList = await headers();
    const token = parseAuthCookie(headersList.get('cookie'));

    if (!token) {
        throw new AuthenticationError('No authentication token provided');
    }

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET, {
            issuer: process.env.JWT_ISSUER,
            audience: process.env.JWT_AUDIENCE,
        });

        const user = await prisma.users.findFirst({
            where: { id: payload.uid },
            include: { roleRelation: true }
        });

        if (!user) {
            throw new AuthenticationError('User not found');
        }

        return { user, payload };
    } catch (error) {
        if (error instanceof AuthenticationError) throw error;
        throw new AuthenticationError('Invalid authentication token');
    }
}

// Core authorization function
export async function authorize(permission, user = null, payload = null) {
    if (!user || !payload) {
        const auth = await authenticate();
        user = auth.user;
        payload = auth.payload;
    }

    const hasPermission = await checkPermission(payload.role, permission);

    if (!hasPermission) {
        throw new AuthorizationError(`Missing permission: ${permission}`);
    }

    return { user, payload };
}

// Combined auth + authz check
export async function requireAuth(permission = null) {
    const { user, payload } = await authenticate();

    if (permission) {
        await authorize(permission, user, payload);
    }

    return { user, payload };
}