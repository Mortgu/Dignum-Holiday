import { isProduction, isDevelopment, isTest } from "./env";

const base = {
    logLevel: isProduction ? 'info' : 'debug',
    apiUrl: isProduction ? '/api' : '/api/dev',
    authCookieName: 'authentication'
};

export const mockUser = {
    uid: process.env.POSTGRES_MOCK_UID,
    name: process.env.POSTGRES_MOCK_USERNAME,
    email: process.env.POSTGRES_MOCK_EMAIL,
    role: process.env.POSTGRES_MOCK_ROLE,
    password: process.env.POSTGRES_MOCK_PASSWORD,
}

export const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export const config = { ...base };
