import { Router } from "express";
import { login } from "../controllers/user";
import { verifyToken } from "../middleware/auth";

const router = Router()

router.post('/', verifyToken, login)

export default router