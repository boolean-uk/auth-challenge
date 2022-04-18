import './App.css';
import { useState } from 'react';
import LoginElement from '../components/LoginElement';
import RegisterElement from '../components/RegisterElement';
import Welcome from '../components/Welcome';
import MovieForm from '../components/MovieForm';
const apiUrl = 'http://localhost:4000';
const serverError = 'Something went wrong!';
const registerRoute = '/user/register';
const loginRoute = '/user/login';
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

	const goToLoginForm = () => {
		setIsLoginForm(true);
		setIsRegisterForm(false);
	};

	const deactivateForms = () => {
		setIsRegisterForm(false);
		setIsLoginForm(false);
	};

	const onInputChange = (e) => {
		setRequestBody({ ...requestBody, [e.target.name]: e.target.value });
	};

	const fetchRequest = (route) => {
		fetch(`${apiUrl}${route}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestBody),
		})
			.then((res) => res.json())
			.then((jsonResponse) => {
				if (route === registerRoute && jsonResponse.ok) {
					setUsername(jsonResponse.registeredUser.username);
				}
				if (route === loginRoute && jsonResponse.ok) {
					localStorage.setItem('userToken', jsonResponse.token);
				}
			})
			.then(() => deactivateForms())
			.then(() => setIsUserLoggedIn(true))
			.catch((e) => {
				console.log(e);
				res.status(500).json(serverError);
			});
	};

	const onFormSubmit = (e) => {
		e.preventDefault();
		if (!isLoginForm) {
			fetchRequest(registerRoute);
		} else fetchRequest(loginRoute);
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
			{isUserLoggedIn && <MovieForm />}
		</>
	);
}

export default App;
