import { useState } from "react";

export default function Movie() {
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    runtimeMins: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/movie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    })
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <>
      <h1>Create Movie</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={movie.title}
          onChange={handleChange}
        ></input>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={movie.description}
          onChange={handleChange}
        ></input>
        <input
          type="number"
          name="runtimeMins"
          placeholder="Runtime (Mins)"
          value={movie.runtimeMins}
          onChange={handleChange}
        ></input>
        <button type="submit">Create Movie</button>
      </form>
    </>
  );
}
