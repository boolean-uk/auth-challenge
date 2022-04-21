const jwt = require('jsonwebtoken')
const secret = "jwtSecret"

const checkToken = (req, res, next) => {
    const auth = req.headers.authorization

    if(!auth) {
        res.status(401)
        res.json({error: "Token is not valid"})
        return
    }

    const token = auth.slice(7)

    try {
        const payload = jwt.verify(token, secret)
        req.userId = payload.userId
        next()
    }
    catch(e) {
        res.status(401)
        res.json({error: "Token is not valid:" + e})
    }

}

module.exports = {
    checkToken
}