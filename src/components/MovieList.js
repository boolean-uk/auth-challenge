import React from "react";
import { useState, useEffect } from "react";

const apiUrl = "http://localhost:4000";

export default function MovieList() {
    const [movies, setMovies] = useState([]);
  
    useEffect(() => {
      // Fetch the list of movies from the backend
      fetch(`${apiUrl}/movie`)
        .then((response) => response.json())
        .then((data) => {
          setMovies(data.movies);
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
        });
    }, []);
  
    return (
      <div>
        <h2>Movie List</h2>
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <h3><b>{movie.title}</b></h3>
              <p>Description: {movie.description}</p>
              <p>Runtime: {movie.runtimeMins}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
