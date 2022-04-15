import './App.css';
import { useState } from 'react';

const apiUrl = 'http://localhost:4000';
const serverError = 'Something went wrong!';
const registerRoute = '/user/register';
const loginRoute = '/user/login';
const initialRequestBody = {
	username: '',
	password: '',
};

function App() {
	console.log('RENDERING APP')
	const [requestBody, setRequestBody] = useState(initialRequestBody);
	const [newUser, setNewUser] = useState('');
	const [isLoginForm, setIsLoginForm] = useState(false);

	const loadLoginForm = () => {
		setIsLoginForm(!isLoginForm);
	};

	const onInputChange = (e) => {
		setRequestBody({...requestBody, [e.target.name]: e.target.value});
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
					setNewUser(jsonResponse.loggedUser.username);
				}
			})

			.then(setRequestBody(initialRequestBody))
			.then(setIsLoginForm(!isLoginForm))
			.catch((e) => {
				console.log(e);
				res.status(500).json(serverError)
			});
	};

	const onFormSubmit = (e) => {
		e.preventDefault();
		if (!isLoginForm) {
			fetchRequest(registerRoute)
		} else fetchRequest(loginRoute)
	};

	return (
		<div className='App'>
			<h1>🎞 Boolean's movieDB 🎞</h1>
			<div className='form-container'>
				<form onSubmit={onFormSubmit}>
					<h2>
						{!isLoginForm && 'Register'}
						{isLoginForm && 'Login'}
					</h2>
					<input
						type='text'
						placeholder='Enter username'
						id='username'
						name='username'
						onChange={onInputChange}
						required
					/>
					<input
						type='password'
						placeholder='Enter password'
						id='password'
						name='password'
						onChange={onInputChange}
						required
					/>
					<input type='submit' value='Submit' id='submit' />
				</form>
			</div>
			<div className='login-instead-container'>
				<p className='login-instead-text'>
					{!isLoginForm && 'Already registered?'}
					{isLoginForm && 'Not registered yet?'}
				</p>
				<p className='login-instead-text login-link' onClick={loadLoginForm}>
					{!isLoginForm && 'Login'}
					{isLoginForm && 'Register'}
				</p>
			</div>
		</div>
	);
}

export default App;
