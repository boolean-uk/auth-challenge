import { Router } from 'express';
const router = Router();
import {registerUser, loginUser, getAllUsers, deleteUser} from '../controllers/user.js';

//Add a new user:
router.post('/register', registerUser);

//Log in a user:
router.post('/login', loginUser);

//Get all users:
router.get('/', getAllUsers);

//Delete a user:
router.delete('/:id', deleteUser);

export default router;
