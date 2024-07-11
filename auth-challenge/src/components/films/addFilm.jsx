import { useState } from "react";
import filmreel from "../../assets/svg/filmreel.svg";
import enter from "../../assets/svg/enter.svg";
import UsersFilms from "./usersFilms";

export default function AddFilm() {
    const [allFilms, setAllFilms] = useState([])
  const [newFilm, setNewFilm] = useState({
    title: "",
    description: "",
    runTime: "",
  });

  fetch('http://localhost:4040/films/users')
    .then(res => res.json())
    .then(json => setAllFilms(json.movies))

  return (
    <div className="film_container">
      <header className="film_header">
        <h1>Good Films</h1>
        <img
          src={filmreel}
          alt="film reel icon"
          id="filmreel"
          className="icon"
        />
      </header>
      <main className="film_main">
        <form>
          <input
            name="title"
            placeholder="Film Title"
            id="film_title"
            className="text_input"
            required
            value={newFilm.title}
          />
          <input
            name="description"
            placeholder="Film Descript"
            id="film_desc"
            className="text_input"
            required
            value={newFilm.description}
          />
          <input
            name="runTime"
            placeholder="Film Runtime"
            id="film_runTime"
            className="text_input"
            required
            value={newFilm.runTime}
          />
          <button name="submit" type="submit">
            <img
              src={enter}
              className="icon"
              id="enter_film_form"
              alt="enter icon"
            />
          </button>
        </form>
        <ul>
            {allFilms.length === 0 ? (
                <li></li>
            ) : (
                allFilms.map((film) => <UsersFilms film={film} key={film.id}/>)
            )}
        </ul>
      </main>
    </div>
  );
}
