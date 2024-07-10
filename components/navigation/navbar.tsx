'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


export default function Navbar({ token }) {
    const router = useRouter()

    function handleSignOut() {
        localStorage.removeItem('token')
        router.refresh()
    }


    function checkToken() {
        if (token) {
            return <button onClick={handleSignOut}>Sign Out</button>
        }

        return (
            <>
                {' '}
                <Link href={'/login'}>
                    <button>Login</button>
                </Link>
                <Link href={'/register'}>
                    <button>Register</button>
                </Link>
            </>
        )
    }

    return (
        <nav>
            <Link href={'/'}>
                <button>Home</button>
            </Link>
            {checkToken()}
        </nav>
    )
}
