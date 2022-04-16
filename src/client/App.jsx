import './App.css';
import { useState } from 'react';
import LoginElement from '../components/LoginElement';
import RegisterElement from '../components/RegisterElement';
import Welcome from '../components/Welcome';
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
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const goToLoginForm = () => {
		setIsLoginForm(true);
		setIsRegisterForm(false);
	};

	const goToRegisterForm = () => {
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
				if (route === registerRoute) {
					setUsername(jsonResponse.registeredUser.username);
				}
				if (route === loginRoute) {
					console.log('server responded: ', jsonResponse);
					localStorage.setItem('userToken', jsonResponse.token);
				}
			})
			.then(() => deactivateForms())
			.then(() => setIsLoggedIn(true))
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
			<h1>🎞 Boolean's movieDB 🎞</h1>
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
			{isLoggedIn && <Welcome username={username} />}
		</>
	);
}

export default App;
