import { sql as _sql } from '../../config.js';
import pkg from 'mssql';

const { connect, NVarChar, DateTime } = pkg;
const createLog = async (logdata) => {
    try {
        let pool = await connect(_sql);
        const query = `INSERT INTO 
        TB_LOGS (
            ID_LOG,
            MESSAGE,
            TYPE,
            DATETIME
        )
        VALUES (
            @idLog,
            @message,
            @type,
            @dateTime
        )`;

        await pool.request()
            .input('idLog', NVarChar(50), logdata.idLog)
            .input('message', NVarChar(50), logdata.message)
            .input('type', NVarChar(50), logdata.type)
            .input('dateTime', DateTime, new Date(logdata.dateTime))
            .query(query);     
                                   
        console.log('Log adicionado com sucesso!');

    } catch (error) {
        throw error;
    }
};

export { createLog } ;