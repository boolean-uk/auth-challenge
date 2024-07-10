import { NextRequest, NextResponse } from 'next/server'
import { registerUser } from '../../../../lib/data'

export async function POST(req: NextRequest) {
  
    try {
        const { username, password } = await req.json()

        if (!username || !password) {
            return NextResponse.json(
                { error: 'Fields missing in the request body' },
                { status: 400 }
            )
        }

        const newUser = await registerUser({ username, password })
        return NextResponse.json({ user: newUser }, { status: 201 })
    } catch (e: any) {
        console.error(e.message)
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}
