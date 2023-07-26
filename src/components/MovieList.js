import React from "react";
import { useState, useEffect } from "react";

const apiUrl = "http://localhost:4000";

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async()=>{
      fetch(`${apiUrl}/movie`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.movies) 
        setMovies(data.movies);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
    }
    getMovies()
  }, []);



  return (
    <div>
      <h2>Movie List</h2>
        {movies.map((movie) => (
         <div key={movie.id}>
            <h3>
              {movie.title}
            </h3>
            <p>Description: {movie.description}</p>
            <p>Runtime: {movie.runtimeMins}</p>
          </div>
        ))}
   
    </div>
  );
}
