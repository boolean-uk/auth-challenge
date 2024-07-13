import { NextRequest, NextResponse } from 'next/server'
import { hasValidToken, isAdmin } from '../../../lib/authFunctions'
import { createMovie, getMovies, getUserInfo } from '../../../lib/data'
import { UserInfo } from '../../../lib/definitions'

export async function POST(req: NextRequest) {
    try {
        const {title, description, runtimeMins} = await req.json()

        const parseMins = Number(runtimeMins)

        if(!title || !description || !runtimeMins || isNaN(parseMins)) {
            return NextResponse.json(
                { error: 'Fields missing in the request body' },
                { status: 400 }
            )
        }
        const token = req.headers.get('authorization').split(' ')[1]
        const tokenData = hasValidToken(token)

        if (!tokenData || isNaN(Number(tokenData.sub))) {
            return NextResponse.json(
                { error: 'Invalid Credentials: Bad Token' },
                { status: 401 }
            )
        }

        const userInfo: UserInfo = await getUserInfo(Number(tokenData.sub))

        if (!isAdmin(userInfo)) {
            return NextResponse.json(
                { error: 'Creation Failed, No Permission' },
                { status: 403 }
            )
        }

        

        

        const newMovie = await createMovie({title, description, runtimeMins:parseMins})

        return NextResponse.json({ movie:newMovie }, { status: 201 })
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}

export async function GET(req: NextRequest) {
    try {
        const movies = await getMovies()
        
        return NextResponse.json({ movies }, { status: 200 })
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}
