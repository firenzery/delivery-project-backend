import { Router } from 'express';
import { getAddress } from '../controllers/address.controller';
const router = Router();

router.get('/:id', getAddress);

export const routes = router;
