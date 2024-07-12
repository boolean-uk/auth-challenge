/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import MovieCard from "./MovieCard";
import AddNewMovieform from "./AddNewMovieForm";
import { useEffect, useState } from "react";
import AdminDashboard from "./AdminDashboard";
import url from "../utils/baseurl";

export default function MoviesPage({ user }) {
  const [movies, setMovies] = useState([]);
  const [adminDash, setAdminDash] = useState(false);

  async function getMovies() {
    const data = await fetch(`${url}/movies`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    });
    const json = await data.json();
    setMovies(json.movies);
  }

  useEffect(() => {
    getMovies();
  }, []);

  function handleClick() {
    localStorage.removeItem("jwt");
    window.location.reload();
  }

  return (
    <div className="grid place-items-center">
      <h1 className="text-4xl my-4">The Boolean Movie Database 🎬</h1>
      <p className="my-2">{`${user.username}`}'s Movies</p>
      <ul className="flex flex-row flex-wrap gap-2 place-items-center justify-evenly mx-10">
        {movies.length === 0 ? (
          <p className="bg-slate-200 p-4 text-xs rounded-md">
            {"No movies :("}
          </p>
        ) : (
          movies?.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} getMovies={getMovies}/>;
          })
        )}
      </ul>

      <AddNewMovieform getMovies={getMovies} />
      {user.role === "ADMIN" && (
        <p
          onClick={() => {
            setAdminDash(!adminDash);
          }}
          className="text-xs my-4 cursor-pointer"
        >
          {adminDash ? "Hide " : "Show "}Admin Dashboard
        </p>
      )}
      {adminDash && <AdminDashboard loggedInUser={user} />}
      <div className="flex place-items-center mt-2">
        <button onClick={handleClick} className="cursor-pointer">
          Log Out
        </button>
        <img className="h-4 ml-2" src="../../assets/exit.svg" />
      </div>
    </div>
  );
}
