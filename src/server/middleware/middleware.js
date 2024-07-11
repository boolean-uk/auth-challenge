import jwt from "jsonwebtoken";

async function verifyLogin(req, res, next) {
  const [_, token] = req.headers.authorization.split(" ");
  
  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.body.username = verifiedToken.username;
    next();
  } catch (e) {
    res.status(401).json({error: 'User not logged in'})
  }
}

export { verifyLogin };
