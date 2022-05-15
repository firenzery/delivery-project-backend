import { Router } from 'express';
import { getAllClients, getClient, addClient, updateClient, deleteClient, login } from '../controllers/client.controller';
const router = Router();

router.get('/all', getAllClients);
router.get('/:id', getClient);
router.post('', addClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);
router.post('/login', login);


export const routes = router;