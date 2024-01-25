import bcrypt from 'bcrypt'

const hashPassword = async(password) => 
    await bcrypt.hash(password, 12)


export { hashPassword }