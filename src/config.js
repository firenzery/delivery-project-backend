import { config } from 'dotenv';
import assert from 'assert';

config();

const {PORT, HOST, HOST_URL, SQL_USER, SQL_PASSWORD, SQL_DATABASE, SQL_SERVER} = process.env;

const sqlEncrypt = process.env.SQL_ENCRYPT === 'true';

assert(PORT, 'PORT is require');
assert(HOST, 'HOST is required');

export const port = PORT;
export const host = HOST;
export const url = HOST_URL;
export const sql = {
    server: SQL_SERVER,
    database: SQL_DATABASE,
    user: SQL_USER,
    password: SQL_PASSWORD,
    options: {
        encrypt: sqlEncrypt,
        enableArithAbort: true
    },
};