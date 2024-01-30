import pkg from 'jsonwebtoken';
const { jwt } = pkg;

const header = {
  "alg": "HS256",
  "typ": "JWT"
}

export const generateToken = (payload) => jwt.sign(header, payload)

export const generateExpiringToken = (payload, secret, expiryTime) => jwt.sign(payload, secret, { expiresIn: expiryTime })

export const verifyToken = (webtoken, secret) => {
  try {
    return jwt.verify(webtoken, secret)
  } catch (error) {
    return false
  }
}