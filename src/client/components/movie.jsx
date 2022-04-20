import Form from "./form";
import Item from "./item";
import { useState, useEffect } from "react";

const apiMovieUrl = "http://localhost:4000/movie";

function Movie() {
    const blankMovie = {
        title: "",
        description: "",
        runtimeMins: "",
      };

    const [moviesList, setMoviesList] = useState([]);

    const [movie, setMovie] = useState(blankMovie);
    const [movieMessage, setMovieMessage] = useState("");


      useEffect(() => {
        fetch(apiMovieUrl, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
          .then((res) => res.json())
          .then((data) => setMoviesList(data.movies));
      }, []);


  const handleCreateMovie = (e) => {
    e.preventDefault();

    setMovieMessage("");

    if (localStorage.getItem("token")) {
      fetch(apiMovieUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(movie),
      })
        .then((response) => response.json())
        .then((data) => {
          setMoviesList([...moviesList, movie]);
          setMovieMessage(data.message);
          setMovie(blankMovie);
        })
        .catch((error) => {
          console.log("Error");
        });
    } else {
      setMovieMessage("User needs to be logged in to add movies");
    }
  };

  const handleCreateMovieItem = (e) => {
    const { value, name } = e.target;

    setMovie({
      ...movie,
      [name]: value,
    });
  };

  return (
    <div className='App'>
      <Form
        formname='Add New movie'
        handleSubmit={handleCreateMovie}
        inputs={[
          <Item
            type='text'
            placeholder='Title'
            name='title'
            value={movie.title}
            handleChange={handleCreateMovieItem}
          />,
          <Item
            type='text'
            placeholder='Description'
            name='description'
            value={movie.description}
            handleChange={handleCreateMovieItem}
          />,
          <Item
            type='number'
            placeholder='Runtime Mins'
            name='runtimeMins'
            value={movie.runtimeMins}
            handleChange={handleCreateMovieItem}
          />,
        ]}
      />

      {movieMessage && <p>{movieMessage}</p>}

      <h2>Movies List</h2>

      {moviesList.map((movie) => (
        <div>
          <h3>{movie.title}</h3>
          <p>Description: {movie.description}</p>
          <p>Runtime: {movie.runtimeMins} mins</p>
        </div>
      ))}
    </div>
  );
}

export default Movie;
