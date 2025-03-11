import { Router } from 'express';
import { getUsers, getUserById, createUser } from './users.js';

const router = Router();

router.get('/', (req, res) => res.send('Hello World'));
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);

export default router;
