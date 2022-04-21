const jwt = require('jsonwebtoken');
const secretKey = '!vbs*dfj#bhn$ksh%vjk';

const verifyToken = (req, res, next) => {
	const authorization = req.headers['authorization'];
	if (!authorization) {
    console.log('no authorization')
		res.status(401).json({ error: 'invalid token' });
		return;
	}
  const parts = authorization.split(' ');
  try {
    const payload = jwt.verify(parts[1], secretKey)
    next()
  }
  catch (err) {
    console.error(err)
		res.status(401).json({ error: 'invalid token' });
    return
  }
};

module.exports = { verifyToken }