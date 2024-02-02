import {prisma} from '../utils/prisma.js'

const movieDb = async ({title, description, runtimeMins}) => {
    return await prisma.movie.create({
        data:{
            title, description, runtimeMins
        }
    })
}

export {movieDb}