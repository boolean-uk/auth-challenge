import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import LogoutButton from './components/LogoutButton'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import {
    loginStateAtom,
    modalAtom,
    showProfileMenuAtom,
} from '../../state/ui.state'
import { userDataAtom } from '../../state/user.state'

export default function Header() {
    const setLogin = useSetAtom(loginStateAtom)
    const setDisplay = useSetAtom(modalAtom)
    const user = useAtomValue(userDataAtom)
    const [showProfileMenu, setShowProfileMenu] = useAtom(showProfileMenuAtom)

    return (
        <header className='navbar fixed bg-base-300 p-4 z-50'>
            <div className='navbar-start'>
                <h1 className='font-bold text-xl btn btn-ghost'>
                    Movie Manager
                </h1>
            </div>
            <div className='navbar-end'>
                {user !== null ? (
                    <div className='flex flex-col justify-center'>
                        <div className='w-52 flex justify-center items-center'>
                            <button
                                className='btn btn-ghost w-48'
                                onClick={() =>
                                    setShowProfileMenu(!showProfileMenu)
                                }
                            >
                                {user.name}{' '}
                                {showProfileMenu ? (
                                    <ChevronUpIcon />
                                ) : (
                                    <ChevronDownIcon />
                                )}
                            </button>
                        </div>
                        {showProfileMenu ? (
                            <div className='fixed top-16 bg-base-300 w-52 h-16 flex justify-center items-center rounded-xl'>
                                <LogoutButton />
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                ) : (
                    <>
                        <button
                            className='btn btn-ghost'
                            onClick={() => {
                                setLogin('signup')
                                setDisplay(true)
                            }}
                        >
                            Sign up
                        </button>
                        <button
                            className='btn btn-primary'
                            onClick={() => {
                                setLogin('login')
                                setDisplay(true)
                            }}
                        >
                            Log in
                        </button>
                    </>
                )}
            </div>
        </header>
    )
}
