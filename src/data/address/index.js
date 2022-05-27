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
        return address.recordset;
    } catch (error) {
        return error.message;
    }
};

const getByUserId = async(userId) => {
    try {
        let pool = await connect(_sql);
        const query = 'SELECT [ID_ADRESS] idAdress,[ID_CLIENT] idClient,[APARTMENT] apartment,[GROUP] [group] FROM TB_ADRESS WHERE ID_CLIENT = @userId';
        const address = await pool.request()
            .input('userId', Int, userId)
            .query(query);
        return address.recordset[0];
    } catch (error) {
        return error.message;
    }
};

const updateAdressData = async(newAdress) => {
    try {
        let pool = await connect(_sql);
        const query = `UPDATE TB_ADRESS
            SET APARTMENT=@apartment,
                [GROUP]=@group
            WHERE ID_CLIENT=@idClient`;
            
        await pool.request()
            .input('idClient', Int, newAdress.idClient)
            .input('apartment', Int, newAdress.apartment)
            .input('group', Int, newAdress.group)
            .query(query); 

        return newAdress;
    } catch (error) {
        return error.message;
    }
}

const putAdress = async(newAdress) => {
    let pool = await connect(_sql);

    try {
        const query = `INSERT INTO 
            TB_ADRESS (
                ID_CLIENT,
                APARTMENT,
                [GROUP]
            )
            VALUES (
                @idClient,
                @apartment,
                @group
            )`;


        await pool.request()
            .input('idClient', Int, newAdress.idClient)
            .input('apartment', Int, newAdress.apartment)
            .input('group', Int, newAdress.group)
            .query(query);   
                
        const adress = await getByUserId(newAdress.idClient);

        return adress;
                                 
    } catch (error) {
        return error.message;
    }
}

export {
    getById,
    updateAdressData,
    putAdress, getByUserId
};