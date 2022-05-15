import { getById } from '../data/sales/index';
const getSale = async (req, res, next) => {
    try {
        const saleId = req.params.id;
        const sale = await getById(saleId);
        res.send(sale);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export default {
    getSale
};