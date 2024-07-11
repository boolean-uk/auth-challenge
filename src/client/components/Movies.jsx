import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Movies() {
  const [movieData, setMovieData] = useState({
    title: "",
    description: "",
    runtime: "",
  });

  const [movies, setMovies] = useState([]);
  const [uniqueTitle, setUniqueTitle] = useState(true);
  const [validToken, setValidToken] = useState(true);

  const loadMovies = () => {
    fetch("http://localhost:4000/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data.movies));
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleMovieChange = (e) => {
    setUniqueTitle(true);
    setValidToken(true);

    const { name, value } = e.target;

    setMovieData({
      ...movieData,
      [name]: value,
    });
  };

  const handleMovieSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:4000/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        title: movieData.title,
        description: movieData.description,
        runtime: Number(movieData.runtime),
      }),
    }).then((res) => {
      if (res.status === 409) {
        setUniqueTitle(false);
        return;
      }

      if (res.status === 401 || res.status === 500) {
        setValidToken(false);
        return;
      }

      setMovieData({
        title: "",
        description: "",
        runtime: "",
      });

      loadMovies();
    });
  };

  return (
    <main id="movies">
      <span id="go-back">
        <Link to={"/"}>&larr; Go back</Link>
      </span>

      <form onSubmit={handleMovieSubmit}>
        <h1>Create a movie</h1>

        <input
          type="text"
          placeholder="Title"
          name="title"
          value={movieData.title}
          onChange={handleMovieChange}
        />

        {!uniqueTitle && (
          <span id="title-not-unique">The title provided already exists</span>
        )}

        <input
          type="text"
          placeholder="Description"
          name="description"
          value={movieData.description}
          onChange={handleMovieChange}
        />

        <input
          type="number"
          placeholder="Runtime"
          name="runtime"
          min={0}
          value={movieData.runtime}
          onChange={handleMovieChange}
        />

        {!validToken && (
          <span id="token-not-valid-movies">
            Register or sing in to an account
          </span>
        )}

        <button type="submit">Submit</button>

        <span>
          You need an account to create one.
          <div>
            <Link to={"/register"}>Register</Link> |
            <Link to={"/login"}>Log in</Link>
          </div>
        </span>
      </form>

      <section>
        <h1>Movie list</h1>

        {movies.length > 0 &&
          movies.map((movie) => (
            <div key={movie.id} id="movie">
              <div>
                <h2>Title</h2>
                <p>{movie.title}</p>
              </div>

              <div>
                <h2>Duration</h2>
                <p>{movie.runtime} min</p>
              </div>

              <div>
                <h2>Plot</h2>
                <p>{movie.description}</p>
              </div>
            </div>
          ))}

        {movies.length === 0 && <p>No movie was created yet.</p>}
      </section>
    </main>
  );
}
