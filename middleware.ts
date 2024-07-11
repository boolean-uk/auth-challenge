import { NextRequest, NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
    if (req.method !== 'GET') {
        if (!req.headers.get('authorization')) {
            return NextResponse.rewrite(new URL('/login', req.url))
        }
    }

    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/api/movies/',
}
