import experss from 'express';
const app = experss()

import cors from 'cors'
import morgan from 'morgan'
app.use(cors())
app.use(morgan('dev'))
app.use(experss.json())

import registerRouter from './routes/registerRouter.js'
import loginRouter from './routes/loginRouter.js'
import movieRouter from './routes/movieRouter.js'

app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/movies', movieRouter)

app.use('*', (req, res, next) => {
    res.status(404).json({
        message: 'Resource not found'
    })
})

export default app