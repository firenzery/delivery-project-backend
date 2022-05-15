import { Router } from 'express';
import  * as clie from '../controllers/client.controller.js';
const router = Router();

router.get('/all', clie.getAllClients);
router.get('/:id', clie.getClient);
router.post('', clie.addClient);
router.put('/:id', clie.updateClient);
router.delete('/:id', clie.deleteClient);
router.post('/login', clie.login);


export const routes = router;