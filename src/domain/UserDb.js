import { prisma } from "../utils/prisma.js";

 const userDatabase = async(username, hashedPassword)=>{
    return await prisma.user.create({
        data:{
            username: username,
            password: hashedPassword
        }
    }
        
    )
}

export default userDatabase 
