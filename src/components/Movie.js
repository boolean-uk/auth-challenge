import React from "react";
import { useState } from "react";

const apiUrl = "http://localhost:4000";

export default function createMovie() {
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    runtimeMins: null,
  });
  const [movieResponse, setMovieResponse] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setMovie((prevMovie) => {
      return {
        ...prevMovie,
        [name]: value,
      };
    });
  }

  function handleCreateMovie(event) {
    event.preventDefault();

    const authToken = localStorage.getItem("Token");

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(movie),
    };
    console.log(authToken);
    console.log("Movie to create:", movie);

    fetch(`${apiUrl}/movie`, options)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)  
        setMovieResponse(`${movie.title} has been created`);
      })
      .catch(function (error) {
        console.log("CATCH ERROR", error);
      });
  }
  return (
    <>
      <h2>Create a movie</h2>
      <form onSubmit={handleCreateMovie}>
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
          placeholder="Runtime"
          value={movie.runtimeMins}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>

        <p>{movieResponse}</p>
      </form>
    </>
  );
}
