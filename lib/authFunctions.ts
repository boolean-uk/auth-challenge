import jwt from 'jsonwebtoken'
import { UserInfo } from './definitions'

export const hasValidToken = (token: string) => {
    const secret = process.env['SECRET_STRING']

    try {
        const tokenData = jwt.verify(token, secret)
        return tokenData
    } catch (error) {
        console.log(error)
        return false
    }
}

export const isAdmin = (userInfo: UserInfo) => {
    if(userInfo.role === 'ADMIN') {
        userInfo.isAdmin = true
        return true
    }
    userInfo.isAdmin = false
    return false
}
