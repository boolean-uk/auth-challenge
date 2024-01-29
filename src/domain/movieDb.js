 import { prisma } from "../utils/prisma.js";

const movieDB = async({title, description, runtimeMins})=>{
    return await prisma.movie.create({
        data:{
            title,
            description,
            runtimeMins,
        }
    }
        
    )
}

export {
    movieDB
}