import jwt from "jsonwebtoken";
import prisma from "../../utils/prisma.js";

function verifyLogin(req, res, next) {
  const [_, token] = req.headers.authorization.split(" ");
  
  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.body.username = verifiedToken.username;
    next();
  } catch (e) {
    res.status(401).json({error: 'User not logged in'})
  }
}

async function verifyAdmin(req, res, next) {
  const [_, token] = req.headers.authorization.split(" ");

  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.body.username = verifiedToken.username;
    const foundUser = await prisma.user.findUnique({
      where: {
        username: verifiedToken.username
      }
    })
    if (foundUser.role !== 'ADMIN') {
      throw Error
    }
    next();
  } catch (e) {
    res.status(401).json({error: 'User not an admin'})
  }
}

export { verifyLogin, verifyAdmin };
