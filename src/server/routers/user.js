import express from "express";
const router = express.Router();

import { login, register } from "../controllers/user.js";
import { validateInput } from "../middlewares/input-validation.js";

router.post("/register", (req, res, next) => {
    if (!validateInput(req)) {
        res.status(400).json({error:'missing input'})
        return
    } 
    next()
}, (req, res)=> {
    register(req, res)
});

router.post("/login", (req, res, next) => {
    if (!validateInput(req)) {
        res.status(400).json({error:'missing input'})
        return
    } 
    next()
}, (req, res)=> {
    login(req, res)
});

export default router;
