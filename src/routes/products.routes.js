import { Router } from 'express';
import { getProduct, getAllProducts, addProduct, getNewArrivalProducts } from '../controllers/products.controller.js';

const router = Router();

router.get('/get-by-id/:id', getProduct);
router.get('/get-new-arrival-products/', getNewArrivalProducts)
router.get('', getAllProducts);
router.post('', addProduct);


export const routes = router;