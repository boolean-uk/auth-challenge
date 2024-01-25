import { registerDb } from "../domains/user.js"
import { hashPassword } from "../utils/hash-password.js"

const register = async (req, res) => {
    const { username, password } = req.body
    const hashedPassword = await hashPassword(password)
    const registeredUser = await registerDb(username, hashedPassword)
    res.status(201).json({message: `Welcome, ${registeredUser.username}!`})
}

export { register }