import bcrypt, { genSalt } from 'bcrypt';
import jwt from 'jsonwebtoken';
import  PrismaClientKnownRequestError  from "@prisma/client"
import { PrismaClient } from '@prisma/client'
import { json } from 'express';
const prisma = new PrismaClient();

import  {registerDb}  from '../domains/user.js'

const jwtSecret = process.env.VITE_JWT_SECRET

const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        if(!username || !password) {
            return res.status(400).json({
                error: "Missing fields in request body"
              })
        }
        

        const registeredUser = await registerDb(username, password)
        
        // const createdUser = null;

        res.status(201).json({ user: registeredUser });
    } catch (e) {
        if(e instanceof PrismaClientKnownRequestError) {
            return res.status(400).json({error : 'Something went Wrong at User controller!'})
        } else {
            return res.status(403).json({error : 'Something went Wrong at User controller!'})
        }
    }
    
};

const login = async (req, res) => {
    const { username, password } = req.body;

    const foundUser = null;

    if (!foundUser) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const passwordsMatch = false;

    if (!passwordsMatch) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const token = null;

    res.json({ data: token });
};

export {
    register,
    login
};
