function RegisterElement({ onFormSubmit, onInputChange, goToLoginForm }) {
	return (
		<div className='register-element'>
			<div className='form-container'>
				<form onSubmit={onFormSubmit}>
					<h2>Register</h2>
					<input
						type='text'
						placeholder='Username'
						id='username'
						name='username'
						onChange={onInputChange}
						required
					/>
					<input
						type='password'
						placeholder='Password'
						id='password'
						name='password'
						onChange={onInputChange}
						required
					/>
					<input type='submit' value='Register' id='submit' />
				</form>
			</div>
			<div className='login-instead-container'>
				<p className='login-instead-text'>Already registered?</p>
				<p className='login-instead-text login-link' onClick={goToLoginForm}>
					Login
				</p>
			</div>
		</div>
	);
}

export default RegisterElement;
