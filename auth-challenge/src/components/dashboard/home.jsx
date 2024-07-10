import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../styling/dashboard.css'

export default function Dashboard() {
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

    console.log(films)

    return (
        <div className="dashboard_container">
            <header className="dashboard_header">
                <h1>
                    Good Films
                </h1>
            </header>
            <main className="dashboard_main">
                <h2>
                    Welcome to Good Films! The app to log all your favourite films.
                </h2>
                <div className="button_box">
                    <Link to="/register">
                        <input 
                         type="button"
                        id="register"
                         name="register"
                        className="button"
                        value="Register"/>
                    </Link>
                    <Link to="/login">
                        <input
                        type="button"
                        id="login"
                        name="login"
                        className="button"
                        value="Login"
                        />
                    </Link>
                </div>
            </main>
        </div>
    )
}