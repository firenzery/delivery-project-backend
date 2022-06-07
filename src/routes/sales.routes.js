import { Router } from 'express';
import { getSalesByUser, addSaleByUser, getProductsBySaleId } from '../controllers/sales.controller.js';
const router = Router();

router.get('/:id', getSalesByUser);
router.post('', addSaleByUser);
router.get('/products/:id', getProductsBySaleId);

export const routes = router;