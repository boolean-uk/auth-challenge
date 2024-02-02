import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'
import {prisma} from '../../utils/prisma.js'
import userDb from '../../domain/userDb.js';
const secret = process.env.JWT_SECRET
const prisma = new PrismaClient();

const jwtSecret = 'mysecret';

const register = async (req, res) => {
    const { username, password } = req.body;

    const createdUser = null;

    const hashPassword = await bcrypt.hash(password,12)
    const newUser = await userDb (username, hashPassword)
    delete newUser.password
    res.json({data: newUser})

    res.json({ data: createdUser });
};

const login = async (req, res) => {
    const { username, password } = req.body;

    const foundUser = null;

    const userFound = await prisma.user.findUnique({
      where:{
        username: username
      }
    })

    if (!foundUser) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const passwordsMatch = false;
    const matchingPassword = await bcrypt.compare (password, userFound.password)

    if (!passwordsMatch) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const token = null;
    const createToken = (payload, secret) => {
      const result = jwt.sign(payload, secret)
      return result
    }

    res.json({ data: token });
};

export {
    register,
    login
};
