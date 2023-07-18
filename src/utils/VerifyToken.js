const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const VerifyToken = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  console.log(token)
  try {
    jwt.verify(token, secret);
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({ e: "unauthorised token" });
  }
};

module.exports = VerifyToken;
