function LoginElement({
	onFormSubmit,
	onInputChange,
	isLoginForm,
	loadLoginForm,
}) {
	return (
		<div className='login-element'>
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

export default LoginElement;
