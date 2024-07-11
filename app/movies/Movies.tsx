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
        <div>
            <h1>Movies</h1>
            <ul>
                {data.movies.map((element) => {
                    return (
                        <li>
                            <h3>Title:{element.title}</h3>
                            <p>{element.description}</p>
                            <p>
                                Runtime: {`${element.runtimeMins} minute`}
                                {pluralise(element.runtimeMins)}
                            </p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
