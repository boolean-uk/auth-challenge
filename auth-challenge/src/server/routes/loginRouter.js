import { Router } from "express";
import { login } from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router()

router.post('/', login)

export default router