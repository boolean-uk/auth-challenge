import { useEffect, useState } from 'react';
import './App.css';
import MovieForm from './components/MovieForm';
import UserForm from './components/UserForm';

const apiUrl = 'http://localhost:4000';

function App() {
    const [movies, setMovies] = useState([]);
    const [userId, setUserId] = useState('');

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
                console.log('Created new user: ', data.data.username);
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
                    console.log(data);
                }
                if (data.data) {
                    console.log('Successfully logged in');
                    localStorage.setItem('token', data.data);
                    setUserId(data.id);
                }
                fetch(`${apiUrl}/movie/${data.id}`)
                    .then((res) => res.json())
                    .then((res) => {
                        console.log(res);
                        setMovies(res.data.movies);
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
                fetch(`${apiUrl}/movie/${data.data.users[0].id}`)
                    .then((res) => res.json())
                    .then((res) => {
                        console.log(res);
                        setMovies(res.data.movies);
                    });
            });
    };

    return (
        <div className="App">
            <h1>Register</h1>
            <UserForm handleSubmit={handleRegister} />

            <h1>Login</h1>
            <UserForm handleSubmit={handleLogin} />

            <h1>Create a movie</h1>
            <MovieForm handleSubmit={handleCreateMovie} />

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
