import { useState } from "react";
import Movie from "./Movie";

export default function MovieForm({ handleSubmit, movies }) {
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    runtimeMins: 60,
  });

  const handleSubmitDecorator = (e) => {
    e.preventDefault();
    handleSubmit(movie);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMovie({
      ...movie,
      [name]: parseInt(value) || value,
    });
  };

  return (
    <>
      <h1>Create a Movie</h1>
      <form onSubmit={handleSubmitDecorator}>
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
          placeholder="Runtime (minutes)"
          value={movie.runtimeMins}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>

      <h1>Movie list</h1>
      <ul>
        {movies &&
          movies.map((movie, i) => (
            <Movie
              key={i}
              id={movie.id}
              title={movie.title}
              description={movie.description}
              runtimeMins={movie.runtimeMins}
            />
          ))}
      </ul>
    </>
  );
}
