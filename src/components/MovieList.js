import React from "react";
import { useState, useEffect } from "react";

const apiUrl = "http://localhost:4000";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [movieResponse, setMovieResponse] = useState("");
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    runtimeMins: null,
  });

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      const response = await fetch(`${apiUrl}/movie`);
      const data = await response.json();
      setMovies(data.movies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setMovie((prevMovie) => {
      return {
        ...prevMovie,
        [name]: value,
      };
    });
  }

  function handleCreateMovie(event) {
    event.preventDefault();

    const authToken = localStorage.getItem("Token");

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(movie),
    };
    console.log(authToken);
    console.log("Movie to create:", movie);

    fetch(`${apiUrl}/movie`, options)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        setMovieResponse(`${movie.title} has been created`);
        getMovies();
      })
      .catch(function (error) {
        console.log("CATCH ERROR", error);
      });
  }

  return (
    <div>
      <h2>Movie List</h2>
      <form onSubmit={handleCreateMovie}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={movie.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={movie.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="runtimeMins"
          placeholder="Runtime"
          value={movie.runtimeMins}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>

        <p>{movieResponse}</p>
      </form>
      {movies.map((movie) => (
        <div key={movie.id}>
          <h3>{movie.title}</h3>
          <p>Description: {movie.description}</p>
          <p>Runtime: {movie.runtimeMins}</p>
        </div>
      ))}
    </div>
  );
}
