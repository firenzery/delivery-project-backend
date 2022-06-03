import { sql as _sql } from '../../config.js';
import pkg from 'mssql';

const { connect, Int, NVarChar } = pkg;

const getById = async(addressId) => {
    try {
        let pool = await connect(_sql);
        const query = 'SELECT * FROM TB_ADDRESS WHERE ID_ADDRESS = @addressId';
        const address = await pool.request()
            .input('addressId', Int, addressId)
            .query(query);
        return address.recordset[0];
    } catch (error) {
        throw error;
    }
};

const getByUserId = async(userId) => {
    try {
        let pool = await connect(_sql);
        const query = 'SELECT [ID_ADRESS] idAdress,[ID_CLIENT] idClient,[APARTMENT] apartment,[GROUP] [group], [BLOCK] [block] FROM TB_ADRESS WHERE ID_CLIENT = @userId';
        const address = await pool.request()
            .input('userId', Int, userId)
            .query(query);
        return address.recordset[0];
    } catch (error) {
        throw error;
    }
};

const updateAdressData = async(newAdress) => {
    try {
        let pool = await connect(_sql);
        const query = `UPDATE TB_ADRESS
            SET APARTMENT=@apartment,
                [GROUP]=@group,
                [BLOCK]=@block
            WHERE ID_CLIENT=@idClient`;
            
        await pool.request()
            .input('idClient', Int, newAdress.idClient)
            .input('apartment', Int, newAdress.apartment)
            .input('group', Int, newAdress.group)
            .input('block', NVarChar(1), newAdress.block)
            .query(query); 

        return newAdress;
    } catch (error) {
        throw error;
    }
}

const putAdress = async(newAdress) => {
    let pool = await connect(_sql);

    try {
        const query = `INSERT INTO 
            TB_ADRESS (
                ID_CLIENT,
                APARTMENT,
                [GROUP],
                [BLOCK]
            )
            VALUES (
                @idClient,
                @apartment,
                @group,
                @block
            )`;


        const res = await pool.request()
            .input('idClient', Int, newAdress.idClient)
            .input('apartment', Int, newAdress.apartment)
            .input('group', Int, newAdress.group)
            .input('block', NVarChar(1), newAdress.block)
            .query(query);   
                
        const adress = await getByUserId(newAdress.idClient);

        return adress;
                                 
    } catch (error) {
        throw error;
    }
}

export {
    getById,
    updateAdressData,
    putAdress, getByUserId
};