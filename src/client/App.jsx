import { useEffect, useState } from 'react';
import './App.css';
import MovieForm from './components/MovieForm';
import UserForm from './components/UserForm';

const apiUrl = 'http://localhost:4000';

function App() {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		fetch(`${apiUrl}/movie`)
			.then((res) => res.json())
			.then((res) => setMovies(res.data));
	}, []);

	const handleRegister = async ({ username, password }) => {
		console.log('Username', username);
		console.log('Pass', password);

		// TODO: Check if username already exists - BACK-END not FRONT
		// TODO: Throw error of Existing User - BACKEND
		// TODO: Add User to DB - BACKEND
	};

	const handleLogin = async ({ username, password }) => {
		console.log('Username', username);
		console.log('Pass', password);
	};

	const handleCreateMovie = async ({ title, description, runtimeMins }) => {
		console.log('title', title);
		console.log('description', description);
		console.log('runtimeMins', runtimeMins);
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
