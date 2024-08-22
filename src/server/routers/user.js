import { Router } from 'express';
const router = Router();
import {registerUser, loginUser} from '../controllers/user.js';

//Add a new user:
router.post('/register', registerUser);

//Log in a user:
router.post('/login', loginUser);

export default router;
