import { sql as _sql } from '../../config';
import { connect, Int } from 'mssql';

const getById = async(addressId) => {
    try {
        let pool = await connect(_sql);
        const query = `SELECT * FROM TB_ADDRESS WHERE ID_ADDRESS = @addressId`;
        const address = await pool.request()
                            .input('addressId', Int, addressId)
                            .query(query);
        return address.recordset;
    } catch (error) {
        return error.message;
    }
}

export default {
    getById
}