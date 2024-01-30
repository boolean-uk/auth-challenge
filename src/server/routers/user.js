import express from "express";

import validateRequest from "../middleware/validateRequest/index.js";

import { loginUser, registerUser } from "../controllers/user.js";
import { registerUserSchema } from "../middleware/validateRequest/user.validate.js";

const router = express.Router();

router.post("/register", validateRequest(registerUserSchema), registerUser);
router.post("/login", validateRequest(registerUserSchema), loginUser);

export default router;
