import { useState } from "react";

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
      [name]: name === "runtimeMins" ? parseInt(value) : value,
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
          movies.map((movie) => {
            return (
              <li key={movie.id}>
                <h3>{movie.title}</h3>
                <p>Description: {movie.description}</p>
                <p>Runtime: {movie.runtimeMins}</p>
              </li>
            );
          })}
      </ul>
    </>
  );
}
