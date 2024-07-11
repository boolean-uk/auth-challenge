import express from 'express'
const userRouter = express.Router()
import { registerUser, loginUser, getUserProfile } from '../controllers/user.js'

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/profile", getUserProfile)

export default userRouter