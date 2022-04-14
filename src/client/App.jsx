import './App.css';
import { useState } from 'react';

const apiUrl = 'http://localhost:4000';

function App() {
	const [isLoginForm, setIsLoginForm] = useState(false);

	const loadLoginForm = () => {
		setIsLoginForm(!isLoginForm);
	};

	return (
		<div className='App'>
			<h1>Nico's movieDB</h1>
			<div className='form-container'>
				<form>
					<h2>
						{!isLoginForm && 'Register'}
						{isLoginForm && 'Login'}
					</h2>
					<input
						type='text'
						placeholder='Enter username'
						id='username'
						required
					/>
					<input
						type='password'
						placeholder='Enter password'
						id='password'
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
