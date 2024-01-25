import express from 'express';
import handleRegister from '../controllers/user'

const router = express.Router();

router.post('/register', handleRegister)

export default router;
