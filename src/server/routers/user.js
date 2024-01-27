import express from 'express'
const router = express.Router()

// Controllers
import { loginUser, registerUser, verifyUser } from '../controllers/user.js'

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/verify', verifyUser)

export default router
