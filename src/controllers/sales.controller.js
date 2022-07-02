import { request } from 'express';
import { getById, getSalesById, addSaleById, getProductsById, updateStateSale } from '../data/sales/index.js';
const getSalesByUser = async (req, res, next) => {
    try {
        const saleId = req.params.id;
        const sale = await getSalesById(saleId);
        res.send(sale);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getProductsBySaleId = async (req, res) => {
    try {
        const saleId = req.params.id;
        const sale = await getProductsById(saleId);
        res.send(sale);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getSaleById = async (req, res, next) => {
    try {
        const saleId = req.params.id;
        const sale = await getById(saleId);
        res.send(sale);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const addSaleByUser = async (req, res, next) => {
    try {
        const sale = await addSaleById(req.body.sale, req.body.products);
        res.send(sale);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const alterStateSale = async (req, res, next) => {
    try {
        const data = await updateStateSale(req.body.idSale, req.body.state);
        res.send(data);
    } catch (error) {
        res.status(400).send(`Erro ao alterar status da compra ==> Erro: ${error.message}`);
    }
}

export {
    getSalesByUser, addSaleByUser, getSaleById, getProductsBySaleId, alterStateSale
};