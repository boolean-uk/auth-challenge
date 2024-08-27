import express, { Router } from 'express'
import * as usersController from '../controller/users'
import authenticate from '../utils/authenticate'

const router: Router = express.Router()

router.post('/register', usersController.registerUser)
router.post('/login', usersController.loginUser)
router.get('/:id', authenticate, usersController.findUser)

export default router
