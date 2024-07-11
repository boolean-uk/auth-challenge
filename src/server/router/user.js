import { Router } from "express"
import {
  createToken,
  createUser,
  deleteUser,
  getAllUsers,
} from "../controllers/user.js"
import { isAdmin, isTokenValid } from "../middlewares/auth.js"

const route = Router()

route.get("/", isTokenValid, isAdmin, getAllUsers)
route.post("/register", createUser)
route.post("/login", createToken)
route.delete("/", isTokenValid, isAdmin, deleteUser)

export default route
