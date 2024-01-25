import { registerDb } from "../domains/user.js";
import { hashPassword } from "../utils/hash-password.js";

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

export { register };
