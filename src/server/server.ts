import express, { Express } from 'express'
import morgan from 'morgan'
import cors from 'cors'

const app: Express = express()

// Set up middleware
app.use(morgan('dev'))
app.use(cors())
app.use(express.json({ limit: '50mb' }))

// Routers
import usersRouter from './routes/users'
import moviesRouter from './routes/movies'
app.use('/users', usersRouter)
app.use('/movies', moviesRouter)

export default app
