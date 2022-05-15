import { Router } from 'express';
import { getSale } from '../controllers/sales.controller';
const router = Router();

router.get('/:id', getSale);

export const routes = router;