import MovieListContent from "./MovieListContent";
//import '../styles/movie-list.css'

function MovieList({ apiUrl }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getAllMovies = async () => {
            const { data } = await axios.get(`${apiUrl}/movie`)
            setMovies(data.data)
        }
        getAllMovies()
      }, [apiUrl]);

    return (
        <section className="movie-list--container grid">
            <Logout />
            <MovieListContent apiUrl={apiUrl} movies={movies} setMovies={setMovies} />
        </section>
    )
}

export default MovieList