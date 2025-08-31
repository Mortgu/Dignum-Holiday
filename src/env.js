import 'dotenv/config';

export const NODE_ENV = process.env.APP_ENV ?? 'development';

export const isProduction = NODE_ENV === 'production';
export const isDevelopment = NODE_ENV === 'development';
export const isTest = NODE_ENV === 'test';