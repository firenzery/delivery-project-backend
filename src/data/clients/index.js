import { sql as _sql } from '../../config.js';
import { hash, compare } from 'bcrypt';
import pkg from 'mssql';

const { connect, Int, NVarChar, DateTime, Numeric } = pkg;



const getAllClients = async () => {
    try {
        let pool = await connect(_sql);
        const query = 'SELECT * FROM TB_CLIENT_INFO';
        const clientsList = await pool.request().query(query);
        return clientsList.recordset;
    } catch (error) {
        throw error;
    }
};

const getById = async(clientId) => {
    try {
        let pool = await connect(_sql);
        const query = 'SELECT * FROM TB_CLIENT_INFO WHERE ID_CLIENT = @clientId';
        const client = await pool.request()
            .input('clientId', Int, clientId)
            .query(query);
        return client.recordset[0];
    } catch (error) {
        throw error;
    }
};

const getByEmail = async(email) => {
    try {
        let pool = await connect(_sql);
        const query = 'SELECT * FROM TB_CLIENT_INFO WHERE EMAIL = @email';
        const client = await pool.request()
            .input('email', NVarChar(50), email)
            .query(query);
        return client.recordset[0];
    } catch (error) {
        throw error;
    }
};

const createClient = async (clientdata) => {
    try {
        let pool = await connect(_sql);

        const clientExist = await pool.request()
            .input('email', NVarChar(50), clientdata.email)
            .query('SELECT * FROM TB_CLIENT_INFO WHERE EMAIL = @email');

        if (clientExist.recordset.length === 0) {
            const query = `INSERT INTO 
            TB_CLIENT_INFO (
                FIRST_NAME,
                SURNAME,
                DATE_NASC,
                EMAIL,
                PASSWORD,
                CPF,
                NR_PHONE
            )
            VALUES (
                @firstName,
                @surname,
                @dateNasc,
                @email,
                @password,
                @cpf,
                @nrPhone
            )`;

            const hashedPassword = await hash(clientdata.password, 10);



            const dateParts = clientdata.dateNasc.split("/");

            const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

            await pool.request()
                .input('firstName', NVarChar(50), clientdata.firstName)
                .input('surname', NVarChar(50), clientdata.surname)
                .input('dateNasc', DateTime, dateObject)
                .input('email', NVarChar(50), clientdata.email)
                .input('password', NVarChar(200), hashedPassword)
                .input('cpf', Numeric, clientdata.cpf)
                .input('nrPhone', Numeric, clientdata.nrPhone)
                .query(query);                            
        } else {
            throw new Error('Email already used');
        }
    } catch (error) {
        throw error;
    }
};

const updateClient = async (data) => {
    try {
        let pool = await connect(_sql);
        const query = `UPDATE TB_CLIENT_INFO
            SET FIRST_NAME=@firstName,
                SURNAME=@surname,
                DATE_NASC=@dateNasc,
                EMAIL=@email,
                PASSWORD=@password,
                NR_PHONE=@cpf,
                CPF=@nrPhone
            WHERE ID_CLIENT=@clientId`;
            
        await pool.request()
            .input('clientId', Int, data.clientId)
            .input('firstName', NVarChar(50), data.firstName)
            .input('surname', NVarChar(50), data.surname)
            .input('dateNasc', DateTime, new Date(data.dateNasc))
            .input('email', NVarChar(50), data.email)
            .input('password', NVarChar(50), data.password)
            .input('cpf', Numeric, data.cpf)
            .input('nrPhone', Numeric, data.nrPhone)
            .query(query);  

        return data;
    } catch (error) {
        throw error;
    }
};

const deleteClient = async (clientId) => {
    try {
        let pool = await connect(_sql);
        const query = `DELETE TB_CLIENT_INFO
            WHERE ID_CLIENT=@clientId`;
        await pool.request()
            .input('clientId', Int, clientId)
            .query(query);
    } catch (error) {
        throw error;
    }
};

const login = async (clientData) => {
    try {
        const client = await getByEmail(clientData.email);
        
        if (client) {
            const vPass = await compare(clientData.password, client.PASSWORD);
            const vEmail = client.EMAIL === clientData.email;

            if (vPass && vEmail) {
                return client;
            } else {
                throw new Error('Credenciais Invalidas!');
            }
        } else {
            throw new Error('Email nao cadastrado!');s
        }

    } catch(err) {
        throw err;
    }
};



export {
    getAllClients,
    getById,
    createClient,
    updateClient,
    deleteClient,
    login,
    getByEmail
};
