import { sql as _sql } from '../../config.js';
import pkg from 'mssql';

const { connect, Int, NVarChar, DateTime, Numeric } = pkg;

const getById = async (categoryId) => {
    try {
        let pool = await connect(_sql);
        const query = 'SELECT * FROM TB_CATEGORIES WHERE ID_CATEGORY = @categoryId';
        const category = await pool.request()
            .input('categoryId', Int, categoryId)
            .query(query);
        return category.recordset;
    } catch (error) {
        return error.message;
    }
};

const getAllCategories = async () => {
    try {
        let pool = await connect(_sql);
        const query = 'SELECT ICON icon, TITLE title, TYPE type FROM TB_CATEGORIES';
        const categories = await pool.request().query(query);
        return categories.recordset;
    } catch (error) {
        return error.message;
    }
}

const createCategory = async (categoryData) => {
    try {
        let pool = await connect(_sql);

        const categoryExist = await pool.request()
            .input('title', NVarChar(50), categoryData.title)
            .query('SELECT * FROM TB_CATEGORIES WHERE TITLE = @title');

        if (categoryExist.recordset.length === 0) {
            const query = `INSERT INTO 
            TB_CATEGORIES(
                ICON,
                TITLE,
                TYPE
            )
            VALUES (
                @icon,
                @title,
                @type
            )`;

            await pool.request()
                .input('icon', NVarChar(100), categoryData.icon)
                .input('title', NVarChar(50), categoryData.title)
                .input('type', NVarChar(50), categoryData.type)
                .query(query);                            
        } else {
            throw new Error('Category already exists');
        }
    } catch (error) {
        return error.message;
    }
};

export {
    getById, getAllCategories, createCategory
};