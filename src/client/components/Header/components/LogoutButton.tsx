import { useSetAtom } from 'jotai'
import { RESET } from 'jotai/utils'
import { userIdAtom, tokenAtom, userDataAtom } from '../../../state/user.state'

export default function LogoutButton() {
    const setUserId = useSetAtom(userIdAtom)
    const setToken = useSetAtom(tokenAtom)
    const setUserObj = useSetAtom(userDataAtom)

    const logout = () => {
        setUserObj(null)
        setUserId(RESET)
        setToken(RESET)
    }

    return (
        <button
            className='btn btn-primary w-48'
            onClick={() => {
                if (window.confirm('Are you sure you want to log out?')) {
                    logout()
                }
            }}
        >
            Log out
        </button>
    )
}
