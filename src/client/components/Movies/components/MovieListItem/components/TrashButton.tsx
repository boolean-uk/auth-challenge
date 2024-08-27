import { Prisma } from '@prisma/client'
import axios from 'axios'
import { Trash2 } from 'lucide-react'
import { API_MOVIES_URL } from '../../../../../const'
import { useAtom, useAtomValue } from 'jotai'
import { refreshAtom } from '../../../../../state/ui.state'
import { tokenAtom } from '../../../../../state/user.state'

export default function TrashButton(props: {
    movie: Prisma.MovieUncheckedCreateInput
}) {
    const token = useAtomValue(tokenAtom)
    const [refresh, setRefresh] = useAtom(refreshAtom)
    const { movie } = props

    const handleDelete = () => {
        axios
            .delete(`${API_MOVIES_URL}/${movie.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res)
                setRefresh(!refresh)
            })
    }

    return (
        <button
            className='btn btn-ghost hover:bg-red-400 hover:text-white'
            onClick={() => {
                if (
                    window.confirm(
                        `Are you sure you want to delete ${movie.title}? \n This action is not reversible.`
                    )
                ) {
                    handleDelete()
                }
            }}
        >
            <Trash2 />
        </button>
    )
}
