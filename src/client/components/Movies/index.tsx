import { useAtom, useAtomValue } from 'jotai'
import Error from '../../Error'
import { useEffect } from 'react'
import axios from 'axios'
import MoviesListItem from './components/MovieListItem'
import MoviesListForm from './components/MovieListForm'
import { SquarePen } from 'lucide-react'
import { API_MOVIES_URL } from '../../const'
import { isAddingAtom, refreshAtom } from '../../state/ui.state'
import { userDataAtom, tokenAtom } from '../../state/user.state'
import { moviesAtom } from '../../state/movie.state'

export default function Movies() {
    const [addingMov, setAddingMov] = useAtom(isAddingAtom)
    const user = useAtomValue(userDataAtom)
    const [movies, setMovies] = useAtom(moviesAtom)
    const token = useAtomValue(tokenAtom)
    const refresh = useAtomValue(refreshAtom)

    useEffect(() => {
        axios
            .get(API_MOVIES_URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => setMovies(res.data.movies))
    }, [refresh])

    if (!user) return <Error />
    if (!movies)
        return (
            <div>
                <span className='loading loading-spinner'></span>
            </div>
        )

    movies.sort((a, b) => {
        if (a.updatedAt !== undefined && b.updatedAt !== undefined) {
            if (a.updatedAt < b.updatedAt) {
                return 1
            }
            if (a.updatedAt > b.updatedAt) {
                return -1
            }
        }
        return 0
    })

    return (
        <div className='flex flex-col gap-4 p-8'>
            <div className='fixed bottom-0 right-0 mr-8 mb-8 z-50'>
                <button
                    className='btn btn-primary px-6 py-3'
                    onClick={() => setAddingMov(!addingMov)}
                >
                    <SquarePen />
                </button>
            </div>
            <div className='flex flex-wrap flex-row gap-8 justify-center items-center'>
                {addingMov ? <MoviesListForm /> : <></>}
                {movies.map((movie) => (
                    <MoviesListItem key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    )
}
