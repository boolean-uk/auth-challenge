import { config } from 'dotenv'
config()

import express from 'express'
import cors from 'cors'

const app = express()
app.disable('x-powered-by')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

import userRouter from './routers/user.js'
app.use('/user', userRouter)

import movieRouter from './routers/movie.js'
app.use('/movie', movieRouter)

app.get('*', (req, res) => {
    res.json({ ok: true })
})

const port = process.env.VITE_PORT
app.listen(port, () => {
    console.log(`\n Server is running on http://localhost:${port}\n`)
})