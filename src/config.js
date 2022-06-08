import { config } from 'dotenv';
import assert from 'assert';

config();

const {PORT, HOST, HOST_URL, SQL_USER, SQL_PASSWORD, SQL_DATABASE, SQL_SERVER, SQL_PORT} = process.env;

const sqlEncrypt = process.env.SQL_ENCRYPT === 'true';

assert(PORT, 'PORT is require');
assert(HOST, 'HOST is required');

export const port = PORT || 3000;
export const host = HOST || 'localhost';
export const url = HOST_URL || 'http://localhost:3000';
export const sql = {
    user: SQL_USER,
    password: SQL_PASSWORD,
    server: SQL_SERVER,
    database: SQL_DATABASE,
    port: parseInt(SQL_PORT), 
    dialect: "mssql",
    options: {
        trustedConnection: true,
        encrypt: sqlEncrypt,
        enableArithAbort: true
    }
};