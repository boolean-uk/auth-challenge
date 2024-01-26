import express from 'express'
const router = express.Router()

// Controllers
import { registerUser } from '../controllers/user.js'

router.post('/register', registerUser)

export default router
