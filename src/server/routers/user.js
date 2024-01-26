import express from "express";

import validateRequest from "../middleware/validateRequest/index.js";

import { registerUser } from "../controllers/user.js";
import { registerUserSchema } from "../middleware/validateRequest/user.validate.js";

const router = express.Router();

router.post("/register", validateRequest(registerUserSchema), registerUser);

export default router;
