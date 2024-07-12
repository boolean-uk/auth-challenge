import express from 'express'
import { register, login, getAllUsers } from '../controllers/user.js'
import { verifyToken, verifyUserIsAdmin } from '../middleware/auth.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/', verifyToken, verifyUserIsAdmin, getAllUsers)

export default router