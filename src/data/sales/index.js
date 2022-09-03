import { sql as _sql } from '../../config.js';
import pkg from 'mssql';

const { connect, Int, Numeric, DateTime } = pkg;

const getById = async (idSale) => {
    try {
        let pool = await connect(_sql);
        const query = 'SELECT [ID_SALE] idSale, [ID_CLIENT] idClient, [PAYMENT] payment, [TOTAL] total, [PAYMENT_TYPE] paymentType, [STATE] state, [DT_SALE] saleDate, [RATING] [rating] FROM TB_SALES WHERE ID_SALE = @idSale';
        const sale = await pool.request()
            .input('idSale', Int, idSale)
            .query(query);
        return sale.recordset[0];
    } catch (error) {
        throw error;
    }
}

const getSalesById = async (idClient) => {
    try {
        let pool = await connect(_sql);
        const query = 'SELECT [ID_SALE] idSale, [ID_CLIENT] idClient, [PAYMENT] payment, [TOTAL] total, [PAYMENT_TYPE] paymentType, [STATE] state, [DT_SALE] saleDate , [RATING] [rating] FROM TB_SALES WHERE ID_CLIENT = @idClient';
        const sale = await pool.request()
            .input('idClient', Int, idClient)
            .query(query);
        return sale.recordset;
    } catch (error) {
        throw error;
    }
};

const getProductsById = async (idSale) => {
    try {
        let pool = await connect(_sql);
        const query = `SELECT saleProd.AMOUNT quantity, prod.ID_PRODUCT idProduct, prod.[IMAGE] [image], prod.NAME [name], prod.PRICE price, prod.[TYPE] [type], prod.[DESCRIPTION] [description], prod.[DATETIME] [dateTime]  FROM TB_SALE_PRODUCTS saleProd
            INNER JOIN TB_PRODUCTS prod
                on saleProd.ID_PRODUCT = prod.ID_PRODUCT
            WHERE saleProd.ID_SALE = @idSale`;

        const products =  await pool.request()
            .input('idSale', Int, idSale)
            .query(query);
        return products.recordset;
    } catch (error) {
        throw error;
    }
}

const addSaleById = async(sale, products) => {
    try {
        let pool = await connect(_sql);

        const queryTbSales = `INSERT INTO 
            TB_SALES(
                ID_CLIENT,
                TOTAL,
                PAYMENT,
                PAYMENT_TYPE,
                STATE,
                DT_SALE,
                RATING
            )
            VALUES (
                @idClient,
                @total,
                @payment,
                @paymentType,
                @state,
                @saleDate,
                @rating
            );
            SELECT SCOPE_IDENTITY() AS [scopeIdentity];
            `;

        const idSale = await pool.request()
            .input('idClient', Int, sale.idClient)
            .input('total', Numeric(6,2), sale.total)
            .input('payment', Int, sale.payment)
            .input('paymentType', Int, sale.paymentType)
            .input('state', Int, 0)
            .input('saleDate', DateTime, new Date())
            .input('rating', Numeric(2,1), 0.0)
            .query(queryTbSales);

        const queryTbSaleProducts = `INSERT INTO
            TB_SALE_PRODUCTS(
                ID_SALE,
                ID_PRODUCT,
                AMOUNT
            )
            VALUES (
                @idSale,
                @idProduct,
                @amount
            )`;
        
        for (let i = 0; i < products.length; i++) {
            await pool.request()
                .input('idSale', Int, idSale.recordset[0].scopeIdentity)
                .input('idProduct', Int, products[i].idProduct)
                .input('amount', Int, products[i].quantity)
                .query(queryTbSaleProducts);
        }

        return await getById(idSale.recordset[0].scopeIdentity);
    } catch (error) {
        throw error;
    }
}

const updateSale = async (sale) => {
    try {
        let pool = await connect(_sql);


        const query = `UPDATE TB_SALES 
            SET PAYMENT = @payment, TOTAL = @total, PAYMENT_TYPE = @paymentType, STATE = @state, RATING = @rating
            WHERE ID_SALE = @idSale`;

        await pool.request()
            .input('idSale', Int, sale.idSale)
            .input('payment', Int, sale.payment)
            .input('total', Numeric(6,2), sale.total)
            .input('paymentType', Int, sale.paymentType)
            .input('state', Int, sale.state)
            .input('rating', Numeric(2,1), sale.rating)
            .query(query);

        return 'Alterado compra com sucesso.';
    } catch (error) {
        throw error;
    }
}

export {
    getSalesById, addSaleById, getById, getProductsById, updateSale
};