import { useState } from "react";

export default function MovieForm({handleURL, status}) {
    const [movie, setMovie] = useState({title: "", description: "", runtime: ""});

    function handleSubmit(event) {
      event.preventDefault();
      handleURL(movie);

      setMovie({ title: "", description: "", runtime: "" });
    }

    function handleInput(event) {
      const { name, value } = event.target;
      console.log("new event.target", event.target.value);

      setMovie({
        ...movie,
        [name]: value,
      });
    }
  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={movie.title}
        onChange={handleInput}
      ></input>
      <input
        type="text"
        name="description"
        placeholder="Decription"
        value={movie.description}
        onChange={handleInput}
      ></input>
      <input
        type="number"
        name="runtime"
        placeholder="Runtime (Minutes)"
        value={movie.runtime}
        onChange={handleInput}
      ></input>
      <button type="submit">Submit</button>
      {status && <p>{status}</p>}
    </form>
  );
}
