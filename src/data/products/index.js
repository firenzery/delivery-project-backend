import { sql as _sql } from '../../config';
import { connect, Int } from 'mssql';

const getById = async(productId) => {
    try {
        let pool = await connect(_sql);
        const query = `SELECT * FROM TB_PRODUCTS WHERE ID_PRODUCT = @productId`;
        const product = await pool.request()
                            .input('productId', Int, productId)
                            .query(query);
        return product.recordset;
    } catch (error) {
        return error.message;
    }
}

export default {
    getById
}