// lib/auth/wrappers.js
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import { requireAuth, AuthenticationError, AuthorizationError } from './core.js';

// For API Routes
export function withAuth(handler, permission = null) {
    return async (request, context) => {
        try {
            const { user, payload } = await requireAuth(permission);
            return await handler(request, context, { user, payload });
        } catch (error) {
            if (error instanceof AuthenticationError) {
                return NextResponse.json(
                    { error: error.message },
                    { status: error.status }
                );
            }

            if (error instanceof AuthorizationError) {
                return NextResponse.json(
                    { error: error.message },
                    { status: error.status }
                );
            }

            console.error('Auth error:', error);
            return NextResponse.json(
                { error: 'Internal server error' },
                { status: 500 }
            );
        }
    };
}

// For Server Components
export async function withPageAuth(permission = null, redirectTo = '/login') {
    try {
        return await requireAuth(permission);
    } catch (error) {
        console.log(error);

        if (error instanceof AuthenticationError) {
            redirect(redirectTo);
        }

        if (error instanceof AuthorizationError) {
            redirect('/403'); // or wherever you handle forbidden access
        }

        console.error('Page auth error:', error);
        redirect('/error');
    }
}

// Optional: For Client Components (returns auth state)
export async function usePageAuth(permission = null) {
    try {
        const result = await requireAuth(permission);
        return {
            ...result,
            isAuthenticated: true,
            isAuthorized: true,
            error: null
        };
    } catch (error) {
        return {
            user: null,
            payload: null,
            isAuthenticated: !(error instanceof AuthenticationError),
            isAuthorized: !(error instanceof AuthorizationError),
            error: error.message
        };
    }
}