import { config } from 'dotenv'
config()

import express from 'express'
import 'express-async-errors'
import cors from 'cors'

const app = express()
app.disable('x-powered-by')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

import userRouter from './routers/user.js'
app.use('/user', userRouter)

import movieRouter from './routers/movie.js'
import { APIError } from './errors/error.js'
app.use('/movie', movieRouter)

app.get('*', (req, res) => {
    res.json({ ok: true })
})

app.use((error, req, res, next) => {
    if (error instanceof APIError) {
        return res.status(error.statusCode).json({
            error: error.message
        })
    }

    res.status(500).json({
        error: error.message
    })
})

const port = process.env.VITE_PORT
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`\n Server is running on http://localhost:${port}\n`)
    })

}

export default app