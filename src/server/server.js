import express from "express"
import "express-async-errors"
import cors from "cors"
import morgan from "morgan"
import router from "./routers/user.js"
import {
	MissingFieldsError,
	ExistingDataError,
} from "./errors/errors.js"

const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const usersRouter = router


app.use('/users', usersRouter)

app.use((error, req, res, next) => {
	if (error instanceof MissingFieldsError) {
		return res.status(400).json({ error: error.message })
	}
    if (error instanceof ExistingDataError) {
        return res.status(409).json({ error: error.message })
    }
	// if (error instanceof DataNotFoundError) {
	// 	return res.status(404).json({ error: error.message })
	// }

	console.error(error)
	res.status(500).json({
		message: "Something went wrong",
	})
})


export default app;
