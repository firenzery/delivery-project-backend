import { getByUserId, updateAdressData, putAdress } from '../data/address/index.js';
const getAddress = async (req, res, next) => {
    try {
        const clientId = Number(req.params.id);
        const address = await getByUserId(clientId);
        res.send(address);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const updateAdress = async (req, res, next) => {
    try {
        const oldAdress = req.body;
        const newAdress = await updateAdressData(oldAdress);
        res.send(newAdress);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const createAdress = async (req, res, next) => {
    try {
        const newAdress = await putAdress(req.body);
        res.status(200).send(newAdress);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export {
    getAddress,
    createAdress,
    updateAdress,
};