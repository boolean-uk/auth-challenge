import { findUserDb, registerDb } from "../domains/user.js";
import { hashPassword, comparePassword } from "../utils/hash-password.js";
import jwt from "jsonwebtoken"

const register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await hashPassword(password);

  let registeredUser 
  try {
    registeredUser = await registerDb(username, hashedPassword);
    res.status(201).json({ message: `Welcome, ${registeredUser.username}!` });
    return
  } catch(e) {
    if (e.code === "P2002"){
    res.status(409).json({error: "invalid username"})
    }
  }
};

const login = async (req, res) => {
  const { username, password } = req.body

  const foundUser = await findUserDb(username)
  if (!foundUser) {
    res.status(401).json({ error:'incorrect username/password' })
    return
  }
  
  const isCorrectPassword = await comparePassword(password, foundUser.password) 
  if (!isCorrectPassword){
    res.status(401).json({ error:'incorrect username/password' })
    return
  }
  
  const token = jwt.sign(username, process.env.SECRET)
  const response = { token }
  response.message = "login successful"

  res.status(201).json({ response })
}

export { 
  register, 
  login
 };
