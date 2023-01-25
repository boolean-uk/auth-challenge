import { useEffect, useState } from 'react';
import './App.css';
import LoginStatus from './components/LoginStatus';
import MovieForm from './components/MovieForm';
import Notification from './components/Notification';
import UserForm from './components/UserForm';

const apiUrl = 'http://localhost:4000';

function App() {
	const [movies, setMovies] = useState([]);
	const [notification, setNotification] = useState('');

	useEffect(() => {
		fetch(`${apiUrl}/movie`)
			.then((res) => res.json())
			.then((res) => setMovies(res.data));
	}, []);

	const handleRegister = async ({ username, password }) => {
		const data = {
			username,
			password,
		};

		// send post request to API with username and pwd
		fetch(`${apiUrl}/user/register`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => {
				setNotification('');
				// TODO: checks if key is error
				const keyName = Object.keys(data)[0];
				if (keyName === 'error') setNotification(`${data.error} 🔴`);
				else setNotification(`User ${data.user.username} created 🟢`);
			})
			.catch((error) => {
				setNotification('');
				setNotification(`Error code ${error.code} 🔴\n${error.message}`);
			});
		// TODO: handle API response - errors and correct register - use notification
		// setNotification('Registered Sucessfuly 🟢');
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
			<LoginStatus />

			{notification && (
				<Notification
					message={notification}
					setNotification={setNotification}
				/>
			)}

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
