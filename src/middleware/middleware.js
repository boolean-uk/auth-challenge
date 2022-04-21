const jwt = require("jsonwebtoken")
const jwtSecret = "mysecret"

const checkToken = (req, res, next) => {
    const authorization = req.headers["authorization"]
    const parts = authorization.split(" ")
    const token = parts[1]

    if(!authorization) {
        res.status(401)
        res.json({error: 'token is not valid, no header'})
        return
    }
    console.log('authorization:' + authorization)
  
    try {
      const tokenV = jwt.verify(token, jwtSecret)
      req.userId = tokenV.userId
      next()
    } catch (e) {
      return res.status(401).json({ error: "Invalid token provided." })
    }
}

module.exports = {checkToken}