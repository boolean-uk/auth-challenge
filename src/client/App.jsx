import { useEffect, useState } from 'react';
import './App.css';
import MovieForm from './components/MovieForm';
import UserForm from './components/UserForm';

const apiUrl = 'http://localhost:4000';

function App() {
    const [movies, setMovies] = useState([]);
    const [userId, setUserId] = useState('');
    const [errorRegister, setErrorRegister] = useState(null);
    const [errorLogin, setErrorLogin] = useState(null);
    const [errorMovie, setErrorMovie] = useState(null);

    useEffect(() => {
        fetch(`${apiUrl}/movie/`)
            .then((res) => res.json())
            .then((res) => setMovies(res.data));
    }, []);

    const handleRegister = async ({ username, password }) => {
        const newUser = { username, password };
        const newUserJSON = JSON.stringify(newUser);

        const options = {
            method: 'POST',
            body: newUserJSON,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        fetch('http://localhost:4000/user/register', options)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setErrorRegister(data.error);
                } else {
                    console.log('Successfully registered');
                    setErrorRegister(null);
                }
            });
    };

    const handleLogin = async ({ username, password }) => {
        const userCredentials = { username, password };
        const userCredentialsJSON = JSON.stringify(userCredentials);

        const options = {
            method: 'POST',
            body: userCredentialsJSON,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        fetch('http://localhost:4000/user/login', options)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    return setErrorLogin(data.error);
                }
                if (data.data) {
                    console.log('Successfully logged in');
                    localStorage.setItem('token', data.data);
                    setErrorLogin(null);
                    setUserId(data.id);
                }
                fetch(`${apiUrl}/movie/${data.id}`)
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.error) {
                            console.log(data);
                        } else {
                            setMovies(data.data.movies);
                        }
                    });
            });
    };

    const handleCreateMovie = async ({ title, description, runtimeMins }) => {
        const token = localStorage.getItem('token');
        const newMovie = { title, description, runtimeMins, userId };
        const newMovieJSON = JSON.stringify(newMovie);

        const options = {
            method: 'POST',
            body: newMovieJSON,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        };

        fetch('http://localhost:4000/movie', options)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    return setErrorMovie(data.error);
                } else {
                    fetch(`${apiUrl}/movie/${data.data.users[0].id}`)
                        .then((res) => res.json())
                        .then((res) => {
                            setMovies(res.data.movies);
                        });
                }
            });
    };

    return (
        <div className="App">
            <h1>Register</h1>
            <UserForm handleSubmit={handleRegister} />
            {errorRegister && <p>{errorRegister}</p>}
            <h1>Login</h1>
            <UserForm handleSubmit={handleLogin} />
            {errorLogin && <p>{errorLogin}</p>}

            <h1>Create a movie</h1>
            <MovieForm handleSubmit={handleCreateMovie} />
            {errorMovie && <p>{errorMovie}</p>}

            <h1>Movie list</h1>
            <ul>
                {movies.map((movie) => {
                    return (
                        <li key={movie.id}>
                            <h3>{movie.title}</h3>
                            <p>Description: {movie.description}</p>
                            <p>Runtime: {movie.runtimeMins}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default App;
