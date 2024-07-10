import express from "express"
import "express-async-errors"
import cors from "cors"
import morgan from "morgan"
import usrRouter from "./routers/user.js"
import movRouter from "./routers/movie.js"
import {
	MissingFieldsError,
	ExistingDataError,
	DataNotFoundError,
	InvalidCredentialsError,
} from "./errors/errors.js"

const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const usersRouter = usrRouter
const moviesRouter = movRouter

app.use('/users', usersRouter)
app.use('/movies', moviesRouter)

app.use((error, req, res, next) => {
	if (error instanceof MissingFieldsError) {
		return res.status(400).json({ error: error.message })
	}
	if (error instanceof InvalidCredentialsError) {
		return res.status(401).json({ error: error.message })
	}
    if (error instanceof DataNotFoundError) {
        return res.status(404).json({ error: error.message })
    }
    if (error instanceof ExistingDataError) {
        return res.status(409).json({ error: error.message })
    }

	console.error(error)
	res.status(500).json({
		message: "Something went wrong",
	})
})


export default app;
