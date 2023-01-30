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
	const [loggedIn, setLoggedIn] = useState(null);

	// FIXME: MUST FETCH THE MOVIES OF THE LOGGEDIN ID AT EVERY RELOAD!

	// const user = localStorage.getItem('user');
	// if (user) {
	// 	setLoggedIn(user);
	// }

	useEffect(async () => {
		// TODO: check if there is localStorage data
		const user = localStorage.getItem('user');
		if (!user) return;

		if (!loggedIn) return;
		console.log(loggedIn);

		await setLoggedIn(user);

		fetch(`${apiUrl}/movie/${loggedIn.id}`)
			.then((res) => res.json())
			.then((res) => setMovies(res.movies));
	}, [loggedIn]);

	const handleRegister = async ({ username, password }) => {
		const data = { username, password };

		fetch(`${apiUrl}/user/register`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => {
				setNotification('');
				const keyName = Object.keys(data)[0];
				if (keyName === 'error') setNotification(`${data.error} 🔴`);
				else setNotification(`User ${data.user.username} created 🟢`);
			})
			.catch((error) => {
				setNotification('');
				setNotification(`Error code ${error.code} 🔴\n${error.message}`);
			});
	};

	const handleLogin = async ({ username, password }) => {
		const data = { username, password };

		fetch(`${apiUrl}/user/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => {
				setNotification('');
				const keyName = Object.keys(data)[0];
				if (keyName === 'error') setNotification(`${data.error} 🔴`);
				else {
					localStorage.setItem('user', data.user);
					setLoggedIn(data.user);
					setNotification('Login successful 🟢');
				}
			})
			.catch((error) => {
				setNotification('');
				setNotification(`Error code ${error.code} 🔴\n${error.message}`);
			});
	};

	const handleCreateMovie = async ({ title, description, runtimeMins }) => {
		const accessToken = loggedIn.accessToken;
		const data = { title, description, runtimeMins, accessToken };
		console.log('data is: ', data);

		// TODO: fetch creating movie
		fetch(`${apiUrl}/user/register`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => {
				setNotification('');
				const keyName = Object.keys(data)[0];
				if (keyName === 'error') setNotification(`${data.error} 🔴`);
				else {
					setNotification(`Movie created 🟢`);
					setMovies(data.movies);
				}
			})
			.catch((error) => {
				setNotification('');
				setNotification(`Error code ${error.code} 🔴\n${error.message}`);
			});
	};

	return (
		<div className="App">
			<LoginStatus loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

			{notification && (
				<Notification
					message={notification}
					setNotification={setNotification}
				/>
			)}

			<section className="SectionUserForm">
				<section>
					<h1>Register</h1>
					<UserForm handleSubmit={handleRegister} />
				</section>

				<section>
					<h1>Login</h1>
					<UserForm handleSubmit={handleLogin} />
				</section>
			</section>

			{loggedIn && (
				<section className="SectionMovieForm">
					<section>
						<h1>Create a movie</h1>
						<MovieForm handleSubmit={handleCreateMovie} />
					</section>

					<section>
						<h1>Movie list</h1>
						<ul>
							{movies &&
								movies.map((movie) => {
									return (
										<li key={movie.id}>
											<h3>{movie.title}</h3>
											<p>Description: {movie.description}</p>
											<p>Runtime: {movie.runtimeMins}</p>
										</li>
									);
								})}
						</ul>
					</section>
				</section>
			)}
		</div>
	);
}

export default App;
