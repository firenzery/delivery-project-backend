import { Router } from 'express';
import { getProduct, getAllProducts, addProduct, getNewArrivalProducts } from '../controllers/products.controller.js';
const router = Router();

router.get('/:id', getProduct);
router.get('', getAllProducts);
router.post('', addProduct);
router.get('/get-new-arrival-products', getNewArrivalProducts)

export const routes = router;