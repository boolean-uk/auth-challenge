import { useState } from "react";

export default function Movie() {
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    runtimeMins: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/movie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify(movie),
    })
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        localStorage.getItem("token")
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({
      ...movie,
      [name]: value,
    });
  };
  
  console.log(movie)

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
