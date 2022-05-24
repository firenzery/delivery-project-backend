import { Router } from 'express';
import { getCategory, getAllCategories, addCategory } from '../controllers/categories.controller.js';
const router = Router();

router.get('/:id', getCategory);
router.get('', getAllCategories);
router.post('', addCategory);

export const routes = router;