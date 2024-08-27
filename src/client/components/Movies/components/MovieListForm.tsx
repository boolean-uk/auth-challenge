import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import axios from 'axios'
import { API_MOVIES_URL } from '../../../const'
import {
    inputTitleAtom,
    inputDescriptionAtom,
    inputCoverAtom,
    inputRuntimeAtom,
} from '../../../state/movie.state'
import { isAddingAtom, refreshAtom } from '../../../state/ui.state'
import { userIdAtom, tokenAtom } from '../../../state/user.state'

export default function MoviesListForm() {
    const [title, setTitle] = useAtom(inputTitleAtom)
    const [description, setDescription] = useAtom(inputDescriptionAtom)
    const [cover, setCover] = useAtom(inputCoverAtom)
    const [runtime, setRuntime] = useAtom(inputRuntimeAtom)
    const setIsAdding = useSetAtom(isAddingAtom)
    const userId = useAtomValue(userIdAtom)
    const token = useAtomValue(tokenAtom)
    const [refresh, setRefresh] = useAtom(refreshAtom)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        axios
            .post(
                API_MOVIES_URL,
                {
                    title: title,
                    description: description,
                    cover: cover,
                    runtimeMins: runtime,
                    userId: userId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                console.log(res)
                setIsAdding(false)
                setRefresh(!refresh)
            })
            .catch((err) => {
                console.error('Error creating movie:', err)
            })
    }

    return (
        <div className='card bg-base-100 image-full w-96 shadow-xl relative min-h-96'>
            <figure className='relative'>
                <img src={cover} alt={title} />
                <div className='absolute inset-0 bg-black opacity-50'></div>
            </figure>
            <form
                className='flex flex-col justify-end z-40 p-8 gap-4'
                onSubmit={(e) => handleSubmit(e)}
            >
                <input
                    className='input input-md'
                    placeholder='Title'
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    className='input input-md'
                    placeholder='Runtime Mins'
                    type='number'
                    value={runtime}
                    onChange={(e) => setRuntime(e.target.value)}
                />
                <input
                    className='input input-md'
                    placeholder='Movie Poster URL'
                    type='url'
                    value={cover}
                    onChange={(e) => setCover(e.target.value)}
                />
                <textarea
                    className='textarea textarea-md'
                    placeholder='Description'
                    cols={20}
                    rows={7}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <input className='btn btn-primary' type='submit' />
            </form>
        </div>
    )
}
