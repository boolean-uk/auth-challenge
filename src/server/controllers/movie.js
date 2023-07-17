const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


const createMovie = async(req, res) => {
    const {title, description, runtimeMins} = req.body
    console.log(runtimeMins)
    
    const token = req.header('authorization')



    try {
        const auth = jwt.verify(token.slice(7), secret)

        const createdMovie = await prisma.movie.create({
            data: {  
                title,
                description,
                runtimeMins: Number(runtimeMins)
            }
        })

        res.status(201).json({createdMovie})

    } catch (err) {
        
        throw new Error("Incorrect token")  
    }
}

module.exports = {
    createMovie
}