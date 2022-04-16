import './App.css';
import { useState } from 'react';
import LoginElement from '../components/LoginElement';
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
	const [newUser, setNewUser] = useState('');
	const [isLoginForm, setIsLoginForm] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const loadLoginForm = () => {
		setIsLoginForm(!isLoginForm);
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
					setNewUser(jsonResponse.registeredUser.username);
				}
				if (route === loginRoute) {
					console.log('server responded: ', jsonResponse);
					localStorage.setItem('userToken', jsonResponse.token);
					// setNewUser(jsonResponse.loggedUser.username);
				}
			})
			.then(setIsLoginForm(!isLoginForm))
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
			{!isLoggedIn && (
				<LoginElement
					onFormSubmit={onFormSubmit}
					onInputChange={onInputChange}
					isLoginForm={isLoginForm}
					loadLoginForm={loadLoginForm}
				/>
			)}
		</>
	);
}

export default App;
