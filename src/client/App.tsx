import axios from 'axios'
import { useAtom, useAtomValue } from 'jotai'
import { useEffect } from 'react'
import Header from './components/Header/index'
import Movies from './components/Movies'
import { API_BASE_URL } from './const'
import LoginModal from './components/LoginModal'
import { modalAtom } from './state/ui.state'
import { userIdAtom, tokenAtom, userDataAtom } from './state/user.state'

export default function App() {
    const displayState = useAtomValue(modalAtom)
    const userId = useAtomValue(userIdAtom)
    const token = useAtomValue(tokenAtom)
    const [user, setUser] = useAtom(userDataAtom)

    useEffect(() => {
        if (![token, userId].includes(null)) {
            axios
                .get(`${API_BASE_URL}/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    setUser(res.data.user)
                    console.log(res)
                })
                .catch((err) => {
                    console.error('Error fetching user data:', err)
                })
        }
    }, [token, userId])

    return (
        <div>
            <Header />
            <main className='h-screen flex justify-center pt-24'>
                <div>
                    {displayState ? <LoginModal /> : <></>}
                    {user ? (
                        <Movies />
                    ) : (
                        <span className='loading loading-spinner'></span>
                    )}
                </div>
            </main>
        </div>
    )
}
