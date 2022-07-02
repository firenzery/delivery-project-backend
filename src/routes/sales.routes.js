import { Router } from 'express';
import { getSalesByUser, addSaleByUser, getProductsBySaleId, alterStateSale } from '../controllers/sales.controller.js';
const router = Router();

router.get('/:id', getSalesByUser);
router.post('', addSaleByUser);
router.get('/products/:id', getProductsBySaleId);
router.put('/state', alterStateSale)

export const routes = router;