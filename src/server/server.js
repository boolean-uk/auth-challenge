import express from "express"
import "express-async-errors"
import cors from "cors"
import morgan from "morgan"
import usrRouter from "./routers/users"

const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const usersRouter = usrRouter






export default app
