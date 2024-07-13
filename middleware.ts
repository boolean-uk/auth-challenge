import { NextRequest, NextResponse } from 'next/server'


export function middleware(req: NextRequest) {
    if (req.method !== 'GET') {
        if (!req.headers.get('authorization')) {
            return NextResponse.json({error: 'Access Forbidden. No Credentials Provided'},{status:401})
        }
    }

    return NextResponse.next()
}


export const config = {
    matcher: '/api/movies/'
}
