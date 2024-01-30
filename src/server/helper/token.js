import pkg from 'jsonwebtoken';
const { jwt } = pkg;

export const generateToken = (payload, secret) => jwt.sign(payload, secret)

export const generateExpiringToken = (payload, secret, expiryTime) => jwt.sign(payload, secret, { expiresIn: expiryTime })

export const verifyToken = (webtoken, secret) => {
  try {
    return jwt.verify(webtoken, secret)
  } catch (error) {
    return false
  }
}