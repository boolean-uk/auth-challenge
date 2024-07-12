import express from 'express'
import { register, login, getAllUsers, deleteUser } from '../controllers/user.js'
import { verifyToken, verifyUserIsAdmin } from '../middleware/auth.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/', verifyToken, verifyUserIsAdmin, getAllUsers)
router.delete('/:id', verifyToken, verifyUserIsAdmin, deleteUser)

export default router