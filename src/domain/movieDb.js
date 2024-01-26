 import { prisma } from "../utils/prisma.js";

const movieDB = async(username, hashedPassword, runtimeMins)=>{
    return await prisma.movie.create({
        data:{
            title: username,
            description: hashedPassword,
            runtimeMins: runtimeMins
        }
    }
        
    )
}

module.exports ={
    movieDB
}