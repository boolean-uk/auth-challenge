import { useEffect, useState } from "react";
import FilmBanner from "./filmBanner";

export default function SideDecoration() {
    const [films, setFilms] = useState([])

    useEffect(() => {
        fetch(
            "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1?",
            {
                method: 'GET',
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTc4NjRiNTE2MGFiYWNiMTY2MjBkMjQxMzEzNTkwMSIsInN1YiI6IjY2NGM3NTdkNWRlOTkyYjM5MDk2NzdiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r_QeHy3M8bm_kjzVChwkoAzboigbojz5kHZp0XavRy8",
                    accept: "application/json",
                },
            }
        )
            .then(res => res.json())
            .then(json => setFilms(json.results))
    }, [])
  return (
    <>
      <section className="left_side">
        <ul className="films_list">
          {films.length === 0 ? (
            <li></li>
          ) : (
            films.map((film) => <FilmBanner film={film} key={film.id} />)
          )}
        </ul>
      </section>
      <aside className="right_aside">
        <ul className="films_list">
          {films.length === 0 ? (
            <li></li>
          ) : (
            films
              .map((film) => <FilmBanner film={film} key={film.id} />)
              .reverse()
          )}
        </ul>
      </aside>
    </>
  );
}
