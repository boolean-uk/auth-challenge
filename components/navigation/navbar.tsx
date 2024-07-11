'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import logo from '../../public/assets/Boolean Logo.png'

export default function Navbar({ token }) {
    const router = useRouter()

    const buttonStyles =
        '"inline-block py-2 px-4 w-full text-sm leading-5 text-white bg-gray-500 hover:bg-gray-600 font-medium text-center focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md"'

    function handleSignOut() {
        localStorage.removeItem('token')
        router.refresh()
    }

    function checkToken() {
        if (token) {
            return (
                <>
                    <div className="hidden xl:block xl:w-1/3">
                        <ul className="flex justify-center gap-32">
                            <Link href={'/movies'}>
                                <button className={buttonStyles}>Movies</button>
                            </Link>

                            <Link href={'/movies/create'}>
                                <button className={buttonStyles}>Create</button>
                            </Link>
                        </ul>
                    </div>
                    <div className="hidden xl:block xl:w-1/3">
                        <div className="flex items-center justify-end">
                            <button
                                className="inline-block py-2 px-4 w-auto text-sm leading-5 text-white bg-blue-500 hover:bg-green-600 font-medium text-center focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md"
                                onClick={handleSignOut}
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </>
            )
        }

        return (
            <>
                <Link href={'/login'}>
                    <button className="inline-block py-2 px-4 w-full text-sm leading-5 text-white bg-green-500 hover:bg-green-600 font-medium text-center focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md">
                        Login
                    </button>
                </Link>
                <Link href={'/register'}>
                    <button className="inline-block py-2 px-4 w-full text-sm leading-5 text-white bg-blue-500 hover:bg-green-600 font-medium text-center focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md">
                        Register
                    </button>
                </Link>
            </>
        )
    }

    return (
        <nav className="flex justify-between p-6 px-4">
            <div className="flex justify-between items-center w-full">
                <div className="xl:w-1/3">
                    <Link href={'/'}>
                        <button className="block max-w-max">
                            <Image
                                src={logo}
                                height={1633 / 2}
                                width={367 / 2}
                                alt={''}
                            />
                        </button>
                    </Link>
                </div>
                {checkToken()}
            </div>
        </nav>
    )
}
