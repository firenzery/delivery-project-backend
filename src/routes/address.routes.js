import { Router } from 'express';
import { getAddress, createAdress, updateAdress } from '../controllers/address.controller.js';
const router = Router();

router.get('/:id', getAddress);
router.post('', createAdress);
router.put('/update', updateAdress);

export const routes = router;
