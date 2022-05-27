import { sql as _sql } from '../../config.js';
import { connect, Int } from 'mssql';

const getById = async(saleId) => {
    try {
        let pool = await connect(_sql);
        const query = 'SELECT * FROM TB_SALES WHERE ID_SALE = @saleId';
        const sale = await pool.request()
            .input('saleId', Int, saleId)
            .query(query);
        return sale.recordset[0];
    } catch (error) {
        throw error;
    }
};

export {
    getById
};