import { Router } from 'express';
import { getProduct } from '../controllers/products.controller.js';
const router = Router();

router.get('/:id', getProduct);

export const routes = router;