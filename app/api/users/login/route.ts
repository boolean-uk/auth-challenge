import { NextRequest, NextResponse } from 'next/server'
import { getUserInfo } from '../../../../lib/data'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

export async function POST(req: NextRequest) {
    const secret = process.env['SECRET_STRING']
    
    try {
        const { username, password } = await req.json()

        if (!username || !password) {
            return NextResponse.json(
                { error: 'Fields missing in the request body' },
                { status: 400 }
            )
        }

        const userData = await getUserInfo(username)

        const verify = await bcrypt.compare(password, userData.passwordHash)

        if (!verify) {
            return NextResponse.json(
                { error: 'Incorrect Credentials' },
                { status: 401 }
            )
        }
        
        const token = jwt.sign({sub:userData.id}, secret)

        return NextResponse.json({ token }, { status: 200 })
    } catch (e: any) {
        if (e.code === 'P2025') {
            return NextResponse.json({ error: e.message }, { status: 404 })
        }
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}
