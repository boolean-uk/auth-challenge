import {prisma} from '../utils/prisma.js'

const userDb = async (username, password) => {
    return await prisma.user.create({
        data: {
            username: username,
            password: password
        }
    })
}
export default userDb 