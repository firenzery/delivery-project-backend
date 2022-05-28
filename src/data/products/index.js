import { sql as _sql } from '../../config.js';
import pkg from 'mssql';

const { connect, Int, NVarChar, DateTime, Numeric } = pkg;
const getById = async (productId) => {
    try {
        let pool = await connect(_sql);
        const query = 'SELECT * FROM TB_PRODUCTS WHERE ID_PRODUCT = @productId';
        const product = await pool.request()
            .input('productId', Int, productId)
            .query(query);
        return product.recordset[0];
    } catch (error) {
        throw error;
    }
};

const getByName = async (name) => {
    try {
        let pool = await connect(_sql);
        const query = 'SELECT ID_PRODUCT idProduct, [IMAGE] [image], [NAME] [name], PRICE price, [TYPE] [type], [DESCRIPTION] [description], [DATETIME] [datetime] FROM TB_PRODUCTS WHERE NAME = @name';
        const product = await pool.request()
            .input('name', NVarChar(50), name)
            .query(query);
        return product.recordset[0];
    } catch (error) {
        throw error;
    }
}

const getAllProducts = async () => {
    try {
        let pool = await connect(_sql);
        const query = 'SELECT IMAGE image, NAME name, PRICE price, TYPE type FROM TB_PRODUCTS';
        const products = await pool.request().query(query);
        return products.recordset;
    } catch (error) {
        throw error;
    }
}

const createProduct = async (productData) => {
    try {
        let pool = await connect(_sql);
        const query = `INSERT INTO 
            TB_PRODUCTS(
                IMAGE,
                NAME,
                PRICE,
                TYPE,
                DESCRIPTION,
                DATETIME
            )
            VALUES (
                @image,
                @name,
                @price,
                @type,
                @description,
                @datetime
            )`;

        await pool.request()
            .input('image', NVarChar(100), productData.image)
            .input('name', NVarChar(50), productData.name)
            .input('price', Numeric(4,2), productData.price)
            .input('type', Int, productData.type)
            .input('description', NVarChar(300), productData.description)
            .input('datetime', DateTime, new Date())
            .query(query);
        
        return await getByName(productData.name); 
    } catch (error) {
        throw error;
    }
};

const getNewProducts = async () => {
    try {
        let pool = await connect(_sql);
        const query = `SELECT TOP(5) ID_PRODUCT idProduct, [IMAGE] [image], [NAME] [name], PRICE price, [TYPE] [type], [DESCRIPTION] [description], [DATETIME] [datetime]
                    FROM TB_PRODUCTS
                    ORDER BY [DATETIME] DESC`;

        const res = await pool.request().query(query);

        return res.recordset;
    } catch (error) {
        throw error;
    }
}

export {
    getById, getAllProducts, createProduct, getNewProducts, getByName
};