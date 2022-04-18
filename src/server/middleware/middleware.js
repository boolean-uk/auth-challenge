const jwt = require('jsonwebtoken');
const jwtSecret = 'mysecret';

const verifyToken = async (req, res, next) => {
    const bearertoken = req.headers["authorization"]
    const token = bearertoken.substring(7)

    console.log('middleware',bearertoken)
    if (!token) {
        res.status(401)
        res.json({ error: 'not valid' })
    }
    try {
        const payLoad = jwt.verify(token, jwtSecret)
        req.username = payLoad
        next()
    } catch (e) {
        res.status(401)
        res.json({ error: 'not valid!!!' })
        return
    }

}

module.exports = { verifyToken }

