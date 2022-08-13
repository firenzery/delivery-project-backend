import { getById, getAllProducts as getAll, createProduct, getPopularProducts as getPopular } from '../data/products/index.js';
import { addLog } from './logs.controller.js';
const getProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await getById(productId);
        res.send(product);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getAllProducts = async (req, res, next) => {
    try {
        const products = await getAll();
        res.send(products);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addProduct = async (req, res, next) => {
    try {
        const data = req.body;
        const product = await createProduct(data);
        addLog({
            idLog: `ADD_PRODUCT_${product.idProduct}_${new Date().getTime()}`,
            message: `Produto ${data.name} adicionada`,
            type: 5,
            dateTime: new Date()
        });
        res.send(product);

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getPopularProducts = async (req, res) => {
    try {
        const products = await getPopular();
        res.send(products);
    } catch (error) {
        res.send(400).send(error.message);
    }
}

export {
    getProduct, getAllProducts, addProduct, getPopularProducts
};