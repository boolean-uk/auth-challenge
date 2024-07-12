import express from 'express'
const userRouter = express.Router()
import { registerUser, loginUser, getUserProfile, getAllUsers, deleteUser } from '../controllers/user.js'
import { verifyAdmin } from '../middleware/middleware.js'

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/profile", getUserProfile)
userRouter.get("/", verifyAdmin, getAllUsers)
userRouter.delete("/:id", verifyAdmin, deleteUser)

export default userRouter