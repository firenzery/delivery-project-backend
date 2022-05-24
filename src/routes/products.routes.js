import { Router } from 'express';
import { getProduct, getAllProducts, addProduct } from '../controllers/products.controller.js';
const router = Router();

router.get('/:id', getProduct);
router.get('', getAllProducts);
router.post('', addProduct);

export const routes = router;