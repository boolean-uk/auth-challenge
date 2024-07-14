import { useEffect, useState } from "react";
import enter from "../../assets/svg/enter.svg";
import UsersFilms from "./usersFilms";

export default function AddFilm() {
  const [state, setState] = useState(false)
  const [allFilms, setAllFilms] = useState([])
  const [newFilm, setNewFilm] = useState({
    title: "",
    description: "",
    runtime: "",
  });

  const token = localStorage.getItem('token')

  useEffect(() => {
    fetch('http://localhost:4040/movies/users',
      { method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
         }}
    )
    .then(res => res.json())
    .then(json => setAllFilms(json.movies))
  }, [state])
  

  function handleChange(e) {
    const {name, value} = e.target
    setNewFilm({
      ...newFilm,
      [name]: value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const titleTooLong = newFilm.title >100
    const descTooLong = newFilm.description > 250

    if(titleTooLong || descTooLong) {
      return alert("Exceded entry capacity")
    }

    if(
      newFilm.title === "" ||
      newFilm.description === "" ||
      newFilm.runtime === ""
    ) {
      return alert("Missing fields for movie entry")
    }

    fetch(`http://localhost:4040/movies`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
       },
      body: JSON.stringify(newFilm)
    })
    
    setState(true)
    fetch('http://localhost:4040/movies/users',
      { method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
         }}
    )
    .then(res => res.json())
    .then(json => setAllFilms(json.movies))

    setNewFilm({
      title: "",
      description: "",
      runtime: "",
    })
    
  }

  return (
    <div className="film_container">
      <main className="film_main">
        <form className="film_form" onSubmit={(e) => handleSubmit(e)}>
          <input
            name="title"
            placeholder="Film Title"
            id="film_title"
            className="text_input"
            required
            value={newFilm.title}
            onChange={(e) => handleChange(e)}
          />
          <input
            name="description"
            placeholder="Film Description"
            id="film_desc"
            className="text_input"
            required
            value={newFilm.description}
            onChange={(e) => handleChange(e)}
          />
          <input
            name="runtime"
            placeholder="Film Runtime"
            id="film_runTime"
            className="text_input"
            required
            value={newFilm.runtime}
            onChange={(e) => handleChange(e)}
          />
          <button name="submit" type="submit" className="enter_button">
            <img
              src={enter}
              className="icon"
              id="enter_film_form"
              alt="enter icon"
            />
          </button>
        </form>
        <ul className="users_films">
            {allFilms.length === 0 || allFilms === undefined ? ( 
                <li></li>
            ) : (
                allFilms.map((film) => <UsersFilms film={film.movie} key={film.movieID}/>).reverse()
            )}
        </ul>
      </main>
    </div>
  );
}
