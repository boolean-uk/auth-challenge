import { registerUserDb } from '../domains/register.js'

async function registerUser(req, res) {
    const { username, password } = req.body
    const user = await registerUserDb(username, password)
    res.status(200).json({ user })
}

export { registerUser }