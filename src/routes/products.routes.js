import { Router } from 'express';
import { getProduct, getAllProducts, addProduct, getPopularProducts } from '../controllers/products.controller.js';

const router = Router();

router.get('/get-by-id/:id', getProduct);
router.get('/get-popular-products/', getPopularProducts)
router.get('', getAllProducts);
router.post('', addProduct);


export const routes = router;