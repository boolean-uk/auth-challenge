import { Router } from 'express';
const router = Router();
import {registerUser, loginUser, getAllUsers} from '../controllers/user.js';

//Add a new user:
router.post('/register', registerUser);

//Log in a user:
router.post('/login', loginUser);

//Get all users:
router.get('/', getAllUsers);

export default router;
