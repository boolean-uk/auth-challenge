import experss from 'express';
const app = experss()

import cors from 'cors'
import morgan from 'morgan'
app.use(cors())
app.use(morgan('dev'))

import registerRouter from './routes/registerRouter.js'
import loginRouter from './routes/loginRouter.js'

app.use('/register', registerRouter)
app.use('/login', loginRouter)

app.use('*', (req, res, next) => {
    res.status(404).json({
        message: 'Resource not found'
    })
})

export default app