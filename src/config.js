import { isProduction, isDevelopment, isTest } from "./env";

const base = {
    logLevel: isProduction ? 'info' : 'debug',
    apiUrl: isProduction ? '/api' : '/api/dev'
};

const perEnv = 
    isProduction ? {
        dbUrl: process.env.POSTGRES_URL,
        corsOrigin: process.env.CORS_ORIGIN,
        cacheResponse: true,
    }
    : isTest  ? {
        dbUrl: process.env.POSTGRES_URL ?? 'postgres://localhost/test',
        corsOrigin: process.env.CORS_ORIGIN,
        cacheResponse: false,
    } : {
        dbUrl: process.env.POSTGRES_URL,
        corsOrigin: process.env.CORS_ORIGIN,
        cacheResponse: false,
    }

export const config = { ...base, ...perEnv };