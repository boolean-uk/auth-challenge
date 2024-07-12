import "dotenv"
import express from "express"
import "express-async-errors"
import morgan from "morgan"
import cors from "cors"

const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

import userRouter from "./router/user.js"
import movieRouter from "./router/movie.js"
import APIError from "./errors/APIError.js"

app.use("/users", userRouter)
app.use("/movies", movieRouter)

app.use((error, req, res, next) => {
  if (error instanceof APIError) {
    return res.status(error.statusCode).json({
      error: error.message,
    })
  }

  console.log(error)

  res.status(500).json({
    error: "Internal error",
  })
})

export default app
