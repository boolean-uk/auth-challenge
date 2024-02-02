import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
import {prisma} from '../../utils/prisma.js'
import { movieDb } from '../../domain/movieDb.js';

const jwtSecret = 'mysecret';
const jwt = process.env.JWT_Secret

const getAllMovies = async (req, res) => {
    const movies = await prisma.movie.findMany();

    res.json({ data: movies });
};

const createMovie = async (req, res) => {
    const { title, description, runtimeMins } = req.body;

    try {
        const token = null;
        // todo verify the token
    } catch (e) {
        return res.status(401).json({ error: 'Invalid token provided.' })
        const authHeader = req.headers.authorization
        if(!authHeader) {
            return res.status(401).json ({err: 'Token is missing'})
        }
        const token = authHeader.split('')[1]
        const verifyToken = async (token, secret) => {
            try{
                const result = await jwt. verify (token, result)
                return result
            }catch (err) {
                console.log(err.message)
            }
        }

        const tokenVerified = await verifyToken (token, jwtSecret)
        if(tokenVerified) {
            const createdMovie = await movieDb ({title, description, runtimeMins})
            res.json({data: createdMovie})
        }else{
            return res.status(401).json({err: err.message || 'Token provided is invalid'})
        }
        }

    const createdMovie = null;

    res.json({ data: createdMovie });
};

export {
    getAllMovies,
    createMovie
};
