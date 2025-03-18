import "dotenv/config";
import express from "express";
import cors from "cors";

export const app = express();

// Middleware
app.use(cors());
app.use(express.json());

import { movieRouter } from "./routers/movieRouter.js";
import { userRouter } from "./routers/userRouter.js";

app.use("/movies", movieRouter);
app.use("/user", userRouter);
