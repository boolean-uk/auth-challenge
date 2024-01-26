import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import MovieForm from "./MovieForm";

function DashboardPage({ movies, handleCreateMovie, error }) {
  return (
    <Box>
      <h1>Create a movie</h1>
      <Link to="/login">Log out</Link>
      <MovieForm handleSubmit={handleCreateMovie} error={error} />
      <h1>Movie list</h1>
      <ul>
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>Description: {movie.description}</p>
              <p>Runtime: {movie.runtimeMins}</p>
            </li>
          );
        })}
      </ul>
    </Box>
  );
}
export default DashboardPage;
