import { Router } from "express";
import { createMovie } from "../controllers/movie";
import { verifyToken } from "../middleware/auth";

const router = Router()

router.post('/', verifyToken, createMovie)

export default router