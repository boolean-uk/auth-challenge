import './App.css';
import { useState, useEffect } from 'react';
import LoginElement from '../components/LoginElement';
import RegisterElement from '../components/RegisterElement';
import Welcome from '../components/Welcome';
import MovieForm from '../components/MovieForm';
import MovieElement from '../components/MovieElement';

const apiUrl = 'http://localhost:4000';
const serverError = 'Something went wrong!';
const noAccessError = 'Invalid username or password';
const registerRoute = '/user/register';
const loginRoute = '/user/login';
const movieRoute = '/movie';
const initialRequestBody = {
	username: '',
	password: '',
};

function App() {
	console.log('RENDERING APP');
	const [requestBody, setRequestBody] = useState(initialRequestBody);
	const [username, setUsername] = useState('');
	const [isLoginForm, setIsLoginForm] = useState(false);
	const [isRegisterForm, setIsRegisterForm] = useState(true);
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
	const [moviesList, setMoviesList] = useState([]);

	useEffect(() => {
		fetch(`${apiUrl}${movieRoute}`)
		.then(res => res.json())
		.then(jsonResponse => setMoviesList(jsonResponse.moviesFound))
  }, []);

	const goToLoginForm = () => {
		setIsRegisterForm(false);
		setIsLoginForm(true);
	};

	const onInputChange = (e) => {
		setRequestBody({ ...requestBody, [e.target.name]: e.target.value });
	};

	const registerRequest = () => {
		fetch(`${apiUrl}${registerRoute}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestBody),
		}).then((res) => {
			if (res.ok) {
				alert('Registration successful!');
				goToLoginForm();
			} else alert('Something went wrong, please try again later');
		});
	};

	const loginRequest = () => {
		fetch(`${apiUrl}${loginRoute}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestBody),
		})
			.then((res) => res.json())
			.then((jsonResponse) => {
				if (jsonResponse.error === noAccessError) {
					alert(noAccessError);
				} else {
					localStorage.setItem('userToken', jsonResponse.token);
					setIsLoginForm(false);
					setIsUserLoggedIn(true);
				}
			});
	};

	const onFormSubmit = (e) => {
		e.preventDefault();
		if (isRegisterForm) {
			registerRequest();
			setRequestBody(initialRequestBody)
		}
		if (isLoginForm) {
			loginRequest()
		}
	};

	return (
		<>
			<h1>🎞 Nico's MovieDB 🎞</h1>
			{isRegisterForm && (
				<RegisterElement
					onFormSubmit={onFormSubmit}
					onInputChange={onInputChange}
					goToLoginForm={goToLoginForm}
				/>
			)}
			{isLoginForm && (
				<LoginElement
					onFormSubmit={onFormSubmit}
					onInputChange={onInputChange}
				/>
			)}
			{isUserLoggedIn && <Welcome username={username} />}
			{isUserLoggedIn && (
				<MovieForm
					apiUrl={apiUrl}
					moviesList={moviesList}
					setMoviesList={setMoviesList}
				/>
			)}
			{isUserLoggedIn && <MovieElement moviesList={moviesList} />}
		</>
	);
}

export default App;
