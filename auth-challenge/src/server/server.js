import experss from 'express';
const app = experss()

import cors from 'cors'
import morgan from 'morgan'
app.use(cors)
app.use(morgan)

import registerRouter from './routes/registerRouter.js'
app.use('/register', registerRouter)


export default app