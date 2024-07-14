import express from "express";
import { createUser, getUserById, logInUser } from "../controllers/user.js";

const usrRouter = express.Router()

usrRouter.post("/register", createUser)

usrRouter.post("/login", logInUser)

usrRouter.get('/:id', getUserById)

export default usrRouter