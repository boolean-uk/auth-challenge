import express from "express";
const router = express.Router();

import { register } from "../controllers/user";
import { validateInput } from "../middlewares/input-validation";

router.post("/register", validateInput(), register);

export default router;
