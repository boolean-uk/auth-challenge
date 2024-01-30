import express from 'express';
const router = express.Router();
import { createUser, getUserByName } from '../controllers/user.js';

router.get('/', getUserByName)
router.post('/register', createUser)

export default router;
