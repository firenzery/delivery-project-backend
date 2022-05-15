import { Router } from 'express';
import { getProduct } from '../controllers/products.controller';
const router = Router();

router.get('/:id', getProduct);

export const routes = router;