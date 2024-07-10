import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const jwtSecret = process.env.JWT_SECRET

async function register(req, res) {
}

async function login(req, res) {

}

export {
    register,
    login
};