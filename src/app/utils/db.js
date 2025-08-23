import { Pool } from "pg";

/**
 * Creates a connection pool for interacting with a PostgreSQL database.
 *
 * The connection pool is configured using environment variables:
 * - `POSTGRES_URL`: The connection string for the PostgreSQL database.
 * - `POSTGRES_USER`: The username for database authentication.
 * - `POSTGRES_HOST`: The host address of the PostgreSQL server.
 * - `POSTGRES_DATABASE`: The name of the database to connect to.
 * - `POSTGRES_PASSWORD`: The password for database authentication.
 * - `POSTGRES_PORT`: The port number for the PostgreSQL server (default: 5432).
 *
 * @module db
 */

const connectionPool = new Pool({
    user: 'oskar',
    password: '',
    host: 'localhost',
    port: 5432,
    database: 'postgres'
});

export default connectionPool;