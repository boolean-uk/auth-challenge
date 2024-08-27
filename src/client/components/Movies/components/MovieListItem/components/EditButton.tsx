import { useSetAtom } from 'jotai'
import { Pencil } from 'lucide-react'
import { isEditingAtom } from '../../../../../state/ui.state'

export default function EditButton() {
    const setIsEditing = useSetAtom(isEditingAtom)

    return (
        <button
            className='btn btn-ghost hover:bg-primary hover:text-white'
            onClick={() => setIsEditing(true)}
        >
            <Pencil />
        </button>
    )
}
