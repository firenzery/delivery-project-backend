import { Router } from 'express';
import { getAddress } from '../controllers/address.controller.js';
const router = Router();

router.get('/:id', getAddress);

export const routes = router;
