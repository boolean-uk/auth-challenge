import { useState } from "react";

const MovieForm = ({ handleSubmit }) => {
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    runtimeMins: "",
  });

  const handleChangeMovie = (e) => {
    const { name, value } = e.target;

    setMovie({
      ...movie,
      [name]: name === "runtimeMins" ? Number(value) : value,
    });
  };

  const formWrapper = (e) => {
    e.preventDefault();
    handleSubmit(movie);
  };

  return (
    <form onSubmit={formWrapper}>
      <input
        type="text"
        placeholder="title"
        name="title"
        value={movie.title}
        onChange={handleChangeMovie}
      />
      <input
        type="text"
        placeholder="description"
        name="description"
        value={movie.description}
        onChange={handleChangeMovie}
      />
      <input
        type="number"
        placeholder="runtime"
        name="runtimeMins"
        value={movie.runtimeMins}
        onChange={handleChangeMovie}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MovieForm;
