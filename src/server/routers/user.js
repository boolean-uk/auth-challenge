import express from "express";
const router = express.Router();

import { register } from "../controllers/user.js";
import { validateInput } from "../middlewares/input-validation.js";

router.post("/register", validateInput, register);

export default router;
