import express from 'express'
const registerRouter = express.Router()
import { registerUser } from '../controllers/register.js'

registerRouter.post("/", registerUser)

export default registerRouter