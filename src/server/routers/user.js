import express from "express";
import { createUser, logInUser } from "../controllers/user.js";

const usrRouter = express.Router()

usrRouter.post("/register", createUser)

usrRouter.post("/login", logInUser)

export default usrRouter