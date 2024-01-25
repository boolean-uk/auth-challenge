import express from "express";
const router = express.Router();

import { register } from "../controllers/user.js";
import { validateInput } from "../middlewares/input-validation.js";

router.post("/register", (req, res, next) => {
    if (!validateInput(req)) {
        res.status(400).json({error:'400 missing input'})
        return
    } 
    next()
}, (req, res)=> {
    register(req, res)
});

export default router;
