import { addLog } from './logs.controller.js';

import * as clie from '../data/clients/index.js';

const getAllClients = async (req, res, next) => {
    try {
        const clientlist = await clie.getAllClients();
        res.send(clientlist);        
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getClient = async (req, res, next) => {
    try {
        const clientId = Number(req.params.id);
        const client = await clie.getById(clientId);
        res.send(client);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getClientByEmail = async (email) => {
    try {
        const client = await clie.getByEmail(email);
        return client;
    } catch (error) {
        throw Error(error.message);
    }
};

const addClient = async (req, res, next) => {
    try {
        const data = req.body;
        await clie.createClient(data);
        addLog({
            idLog: `ADD_CLIENT_${data.cpf.toString().slice(0, 3)}_${data.nrPhone.toString().slice(-4)}_${new Date().getTime()}`,
            message: `Cliente ${data.firstName} adicionado`,
            type: 1,
            dateTime: new Date()
        });
        const client = await getClientByEmail(data.email);
        res.send(client);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const updateClient = async (req, res, next) => {
    try {
        const clientId =  req.params.id;
        const data = req.body;
        const updated = await clie.updateClient(clientId, data);
        addLog({
            idLog: `UPDATE_CLIENT_${data.cpf.toString().slice(0, 3)}_${data.nrPhone.toString().slice(-4)}_${new Date().getTime()}`,
            message: `Cliente ${data.firstName} atualizado`,
            type: 2,
            dateTime: new Date()
        });
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const deleteClient = async (req, res, next) => {
    try {
        const clientId = req.params.id;
        const client = await clie.getById(clientId);
        if(client.length > 0) {
            const data = client[0];
            const deletedClient = await clie.deleteClient(clientId);
            addLog({
                idLog: `DELETE_CLIENT_${data.CPF.toString().slice(0, 3)}_${data.NR_PHONE.toString().slice(-4)}_${new Date().getTime()}`,
                message: `Cliente ${client[0].FIRST_NAME} excluido`,
                type: 3,
                dateTime: new Date()
            });
            res.send(deletedClient);
        } else {
            res.send('O Cliente nao existe');
        }
        
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const login = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await clie.login(data);
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export {
    getAllClients,
    getClient,
    addClient,
    updateClient,
    deleteClient,
    login
};