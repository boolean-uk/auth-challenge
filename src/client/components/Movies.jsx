import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Movies() {
  const [movieData, setMovieData] = useState({
    title: "",
    description: "",
    runtime: "",
  });

  const [movies, setMovies] = useState([]);

  const loadMovies = () => {
    fetch("http://localhost:4000/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data.movies));
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleMovieChange = (e) => {
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
    }).then(() => {
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
      <form onSubmit={handleMovieSubmit}>
        <h1>Create a movie</h1>

        <input
          type="text"
          placeholder="Title"
          name="title"
          value={movieData.title}
          onChange={handleMovieChange}
        />

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

        <button type="submit">Submit</button>

        <span>
          You need an account to create one.
          <div>
            <Link to={"/register"} id="register-link">
              Register
            </Link>{" "}
            |
            <Link to={"/login"} id="login-link">
              Log in
            </Link>
          </div>
        </span>
      </form>

      <section>
        <h1>Movie list</h1>

        {movies.map((movie) => (
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
      </section>
    </main>
  );
}
