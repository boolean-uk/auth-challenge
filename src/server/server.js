import { config } from 'dotenv';
config();
import express from 'express'
import cors from 'cors'
import morgan from 'morgan';
import moviesRouter from '../server/routes/movies.js'
import registerRouter from '../server/routes/register.js'

const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/movies", moviesRouter)
app.use("/register", registerRouter)


export default app