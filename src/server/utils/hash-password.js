import bcrypt from 'bcrypt'

const hashPassword = async(password) => 
    await bcrypt.hash(password, 12)

const comparePassword = async (password, hashedPassword) => 
    await bcrypt.compare(password, hashedPassword)
export { 
    hashPassword, 
    comparePassword
}