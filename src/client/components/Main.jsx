import { useState, useEffect } from "react";

import MovieForm from "./MovieForm";
import DeleteModal from "./DeleteModal";

export default function Main({ token, baseURL }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    if (token) {
      fetch(`${baseURL}/movies`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && !data.error) {
            setError("");
            setMovies(data);
          } else {
            setError(data.error);
          }
        });
    }
  }, [token]);

  const addMovie = (movie) => {
    setMovies([...movies, movie]);
  };

  async function handleConfirm(id) {
    await fetch(`${baseURL}/movies/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setMovies(movies.filter((movie) => movie.id !== id));
          setShow(false);
          console.log(data);
        }
        setShow(false);
      });
  }

  return (
    <>
      <main>
        <div className="add-movie-form">
          <MovieForm token={token} addMovie={addMovie} baseURL={baseURL} />
        </div>
        <div>
          <h2>Movies</h2>
          {movies.length ? (
            <ul className="movies">
              {/* Here we render the ul conditionally: if there is an error while fetching the data, show an error message. If no error but also the movies array is empty, then show another message; otherwise, show the movies list. */}
              {movies.map((movie) => {
                return (
                  <ul className="movie" key={movie.id}>
                    <li>
                      <span>Title:</span> {movie.title}
                    </li>
                    <li>
                      <span>Description:</span> {movie.description}
                    </li>
                    <li>
                      <span>Run Time:</span> {movie.runtimeMins}{" "}
                      <span className="mins">mins</span>
                    </li>
                    {/* <button onClick={() => handleDeleteMovie(movie.id)}> */}
                    <button
                      title="Delete Movie"
                      className="del-movie-btn"
                      onClick={() => {
                        setShow(true);
                        setId(movie.id);
                      }}
                    >
                      ❌
                    </button>
                  </ul>
                );
              })}
            </ul>
          ) : error ? (
            <p>Sorry! Failed to load data </p>
          ) : (
            <p>
              There are no movies in your list! You can add a movie to your list
              by using the <b>Add Movie</b> form.
            </p>
          )}
        </div>
        <DeleteModal
          show={show}
          setShow={setShow}
          handleConfirm={handleConfirm}
          id={id}
        />
      </main>
    </>
  );
}
