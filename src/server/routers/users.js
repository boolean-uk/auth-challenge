import express from "express";

const usrRouter = express.Router()

usrRouter.post("/register", createUser)

export default usrRouter