import { useEffect, useState } from "react";
import "./App.css";
import MovieForm from "./components/MovieForm";
import UserForm from "./components/UserForm";

const apiUrl = "http://localhost:4000";

function App() {
	const [movies, setMovies] = useState([]);
	const [registerResponse, setRegisterResponse] = useState(null);

	useEffect(() => {
		fetch(`${apiUrl}/movie`)
			.then((res) => res.json())
			.then((res) => setMovies(res.data));
	}, []);

	const handleRegister = async (user) => {
		if (!user.username || !user.password) return;

		const options = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(user),
		};

		const res = await fetch(`${apiUrl}/user/register`, options);
		const data = await res.json();

		setRegisterResponse(data);
		console.log(registerResponse);
	};

	const handleLogin = async ({ username, password }) => {};

	const handleCreateMovie = async ({ title, description, runtimeMins }) => {};

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
