import pkg from 'jsonwebtoken';
const { jwt } = pkg;

const cert = {
  id: 123,
  username: "Ally",
  email: "ally@douillette.com",
  role: "admin"
}

const secret = "ashjdjahfjahsdjahdjasdahsjda"

export const generateToken = (payload, secret) => jwt.sign(payload, secret)

export const generateExpiringToken = (payload, secret, expiryTime) => jwt.sign(payload, secret, { expiresIn: expiryTime })

export const verifyToken = (webtoken, secret) => {
  try {
    return jwt.verify(webtoken, secret)
  } catch (error) {
    return false
  }
}