import { Prisma } from '@prisma/client'
import { useAtomValue } from 'jotai'
import { isEditingAtom } from '../../../../atoms'
import EditMovieListItem from '../EditMovieListItem'
import EditButton from './components/EditButton'
import TrashButton from './components/TrashButton'

export default function MoviesListItem(props: {
    movie: Prisma.MovieUncheckedCreateInput
}) {
    const isEditing = useAtomValue(isEditingAtom)
    const { movie } = props

    if (isEditing) return <EditMovieListItem movie={movie} />
    return (
        <div className='card bg-base-100 image-full w-96 shadow-xl relative min-h-96'>
            <figure className='relative'>
                <img
                    className='h-72 w-full'
                    src={movie.cover}
                    alt={movie.title}
                />
                <div className='absolute inset-0 bg-black opacity-50'></div>
            </figure>
            <div className='flex flex-col justify-end z-40 p-8 gap-2'>
                <h1 className='card-title'>{movie.title}</h1>
                <p className='text-sm'>Runtime: {movie.runtimeMins} mins</p>
                <p className='italic'>{movie.description}</p>
                <div className='card-actions items-center'>
                    <p className='text-sm flex-grow'>
                        {/* @ts-ignore */}
                        Added by {movie.user.name}
                    </p>
                    <EditButton />
                    <TrashButton movie={movie} />
                </div>
            </div>
        </div>
    )
}
