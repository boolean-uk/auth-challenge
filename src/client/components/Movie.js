import { useEffect, useState } from "react";

export default function Movie() {

  const [movie, setMovie] = useState({
    title: "",
    description: "",
    runtimeMins: "",
  });

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/movie")
      .then((res) => res.json())
      .then((data) => setMovies(data.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      fetch("http://localhost:4000/movie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(movie),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('data.movie', data.movie)
          setMovies(
            [... movies, 
            data.movie]);
        });
      } catch (error) {
        console.log(e);
      }
    };
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setMovie({
        ...movie,
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
      
      <h1>Movie List</h1>
      <ul>
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              <h2>{movie.title}</h2>
              <p>Description: {movie.description}</p>
              <p>Runtime: {movie.runtimeMins}mins</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
