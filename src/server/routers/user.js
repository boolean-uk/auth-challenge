import express from "express";
const router = express.Router();

import { login, register } from "../controllers/user.js";
import { validateInput } from "../middlewares/user-input-validation.js";

router.post("/register", (req, res, next) => {
    if (!validateInput(req)) {
        res.status(400).json({error:'missing input'})
        return
    } 
    next()
}, 
    register
);

router.post("/login", (req, res, next) => {
    if (!validateInput(req)) {
        res.status(400).json({error:'missing input'})
        return
    } 
    next()
}, 
    login
);

export default router;
