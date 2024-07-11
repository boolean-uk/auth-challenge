import useSWR from 'swr'

export default function Movies() {
    const fetcher = (...args) =>
        fetch('/api/movies', {
            method: 'GET',
            headers: { 'Content-type': 'application/json' },
        }).then((res) => res.json())

    const { data, error, isLoading } = useSWR('/api/movies', fetcher)

    if (isLoading) {
        return (
            <div>
                <h1>Movies</h1>
                <p>loading...</p>
            </div>
        )
    }

    if (error) {
        return <div>{error.message}</div>
    }

    function pluralise(runtimeMins: number) {
        if (runtimeMins > 1) {
            return 's'
        }

        return ''
    }
    return (
        <section className="py-24 md:pt-32 bg-white">
            <div className="container px-4 mx-auto">
                <h1 className="mb-4 text-4xl md:text-5xl leading-tight text-coolGray-900 font-bold tracking-tighter">
                    Movies
                </h1>
                <ul>
                    {data.movies.map((element) => {
                        return (
                            <li className="group relative h-full px-8 pt-16 pb-8 bg-coolGray-50 group-hover:bg-white rounded-md shadow-md hover:shadow-xl transition duration-200">
                                <h3 className="mb-4 text-xl leading-7 text-coolGray-900 font-bold max-w-xs">Title:{element.title}</h3>
                                <p className="text-coolGray-500 group-hover:text-coolGray-600 font-medium transition duration-200">{element.description}</p>
                                <p className="text-coolGray-500 group-hover:text-coolGray-600 font-medium transition duration-200">
                                    Runtime: {`${element.runtimeMins} minute`}
                                    {pluralise(element.runtimeMins)}
                                </p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}
