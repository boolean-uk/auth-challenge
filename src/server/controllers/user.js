import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { registerUserDB, findUser } from '../domain/user.js';
const jwtSecret = "mysecret";

const register = async (req, res) => {
    const { username, password } = req.body;

    if (!password || !username) {
        return res.status(409).json({error: "Please enter username or password"});
    }
    try {
        const hash = await bcrypt.hash(password, 12);
        
        const createdUser = await registerUserDB(username, hash);
        res.status(201).json({ data: createdUser, message: "User created" });

    } catch (err) {
        // console.log(err.message)
        res.status(500).json({ message: err.message });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await findUser(username)

    if (!foundUser) {
        return res.status(401).json({ message: "Invalid username or password." });
    }

    const passwordsMatch = await bcrypt.compare(password, foundUser.password)

    if (!passwordsMatch) {
        return res.status(401).json({ message: "Invalid username or password." });
    }

    const token = jwt.sign(username, jwtSecret)
    res.status(201).json({ token: token, message:"User logged in" });
};

export { register, login };
