import { Request, Response } from 'express'
import prisma from '../utils/prisma'

export const getAllMovies = async (req: Request, res: Response) => {
    try {
        const result = await prisma.movie.findMany({
            include: {
                user: true,
            },
        })
        res.json({ movies: result })
    } catch (e: any) {
        res.json({ error: e.message })
    }
}

export const createMovie = async (req: Request, res: Response) => {
    const { title, runtimeMins, description, cover, userId } = req.body

    try {
        const result = await prisma.movie.create({
            data: {
                title: title,
                runtimeMins: parseInt(runtimeMins),
                description: description,
                cover: cover,
                userId: parseInt(userId),
            },
            include: {
                user: true,
            },
        })
        res.json({ movie: result })
    } catch (e: any) {
        res.json({ error: e.message })
    }
}

export const deleteMovie = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)

    try {
        const result = await prisma.movie.delete({
            where: {
                id: id,
            },
        })
        res.json({
            message: `Successfully deleted movie with id: ${id}`,
            movie: result,
        })
    } catch (e: any) {
        res.json({ error: e.message })
    }
}

export const editMovie = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const { title, description, cover, runtimeMins } = req.body

    try {
        const result = await prisma.movie.update({
            where: {
                id: id,
            },
            data: {
                title: title,
                description: description,
                cover: cover,
                runtimeMins: parseInt(runtimeMins),
            },
        })
        res.json({ message: 'Succesfully updated movie', movie: result })
    } catch (e: any) {
        res.json({ error: e.message })
    }
}
