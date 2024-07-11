'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Navbar({ token }) {
    const router = useRouter()

    const buttonStyles =
        '"font-bold rounded-lg text-lg  w-32 h-16 bg-[#00ADB5] text-[#EEEEEE] justify-center"'

    function handleSignOut() {
        localStorage.removeItem('token')
        router.refresh()
    }

    function checkToken() {
        if (token) {
            return (
                <>
                    <Link href={'/movies'}>
                        <button className={buttonStyles}>Movies</button>
                    </Link>
                    <button className={buttonStyles} onClick={handleSignOut}>Sign Out</button>
                </>
            )
        }

        return (
            <>
                {' '}
                <Link href={'/login'}>
                    <button className={buttonStyles}>Login</button>
                </Link>
                <Link href={'/register'}>
                    <button className={buttonStyles}>Register</button>
                </Link>
            </>
        )
    }

    return (
        <nav className='.flex .flex-row'>
            <Link href={'/'}>
                <button className={buttonStyles}>Home</button>
            </Link>
            {checkToken()}
        </nav>
    )
}
