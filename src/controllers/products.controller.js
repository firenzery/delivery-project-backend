import { getById } from '../data/products/index.js';
const getProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await getById(productId);
        res.send(product);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export {
    getProduct
};