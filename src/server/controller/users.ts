import { Request, Response } from 'express'
import prisma from '../utils/prisma'
import { generateToken } from '../utils/authenticate'
import { hash, compare } from 'bcryptjs'

export const findUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)

    try {
        const result = await prisma.user.findUnique({
            where: {
                id: id,
            },
        })

        res.json({ user: result })
    } catch (e: any) {
        res.json({ error: e.message })
    }
}

export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body

    try {
        const hashedPassword = await hash(password, 10)

        const result = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        })

        const token = await generateToken(result.id.toString())

        res.json({
            message: 'User successfully added',
            user: result,
            token,
        })
    } catch (e: any) {
        res.status(500).json({ error: e.message })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body

    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
        })

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        const isPasswordValid = await compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        const token = await generateToken(user.id.toString())

        res.json({
            message: 'Login successful',
            user: user,
            token,
        })
    } catch (e: any) {
        res.status(500).json({ error: e.message })
    }
}
