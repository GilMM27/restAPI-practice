import { Router } from 'express';
import { getUsers, getUserById, loginApi } from './users.js';
import { postUser } from './utils/hash.js';

const router = Router();

router.get('/', (req, res) => {
  res.sendFile('index.html', { root: './public' });
});
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', postUser);
router.post('/login', loginApi);

export default router;
