import express from 'express'
const router = express.Router()

// Controllers
import { loginUser, registerUser } from '../controllers/user.js'

router.post('/register', registerUser)
router.post('/login', loginUser)

export default router
