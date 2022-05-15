import { getById } from '../data/address/index';
const getAddress = async (req, res, next) => {
    try {
        const addressId = req.params.id;
        const address = await getById(addressId);
        res.send(address);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export default {
    getAddress
};