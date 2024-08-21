import { useState } from "react";

export default function MovieForm() {
    const [movie, setMovie] = useState({title: "", description: "", runtime: 0});

    function handleInput(event) {
      const { name, value } = event.target;
      console.log("new event.target", event.target.value);

      setMovie({
        ...movie,
        [name]: value,
      });
    }
  return (
    <form className="user-form">
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
        placeholder="Run Time"
        value={movie.runtime}
        onChange={handleInput}
      ></input>
      <button type="submit">Submit</button>
    </form>
  );
}
