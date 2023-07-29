import { useState, useEffect } from 'react'
import './App.css'

const apiUrl = 'http://localhost:4000'
// This is where the api are in the backend

function App() {
	const initialUserInput = {
		username: '',
		password: '',
		token: '',
	}
	// const [user, setUser] = useState(initialUserInput)
	// const [saveUser, setSaveUser] = useState(initialUserInput)
	const [registerUser, setRegisterUser] = useState(initialUserInput)
	const [loginUser, setLoginUser] = useState(initialUserInput)

	const initialMovieInput = {
		title: '',
		description: '',
		runtimeMins: '',
	}
	const [movieList, setMovieList] = useState([])
	const [movieInput, setMovieInput] = useState(initialMovieInput)

	// const [error, setError] = useState('')

	useEffect(() => {
		const movieList = getMovies()
	}, [])

	// User

	function handleRegisterChange(e) {
		e.preventDefault()
		const inputName = e.target.name
		const inputValue = e.target.value

		setRegisterUser({ ...registerUser, [inputName]: inputValue })
		console.log('Register value', inputName, inputValue)
	}

	function handleLoginChange(e) {
		e.preventDefault()
		const inputName = e.target.name
		const inputValue = e.target.value

		setLoginUser({ ...loginUser, [inputName]: inputValue })
		console.log('Login value', inputName, inputValue)
	}
	function handleRegister(e) {
		e.preventDefault()

		fetch(`${apiUrl}/user/register`, {
			method: 'POST',
			body: JSON.stringify(registerUser),
			headers: { 'Content-Type': 'application/json' },
		})
			.then((response) => response.json())
			.then((data) => {
				setRegisterUser({ ...registerUser, token: data.token })
			})
			.catch((err) => {
				console.error(err)
			})
	}

	function handleLogin(e) {
		e.preventDefault()

		fetch(`${apiUrl}/user/login`, {
			method: 'POST',
			body: JSON.stringify(loginUser),
			headers: { 'Content-Type': 'application/json' },
		})
			.then((response) => response.json())
			.then((data) => {
				setLoginUser({ ...loginUser, token: data.token })
				localStorage.setItem('token', data.token)
			})
			.catch((err) => {
				console.error(err)
			})
	}

	// Movies
	function getMovies() {
		fetch(`${apiUrl}/movie`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		})
			.then((res) => {
				return res.json()
			})
			.then((data) => {
				setMovieList(data.movies)
			})
	}

	function handleMovieTitleChange(e) {
		e.preventDefault()
		const value = e.target.value
		setMovieInput({ ...movieInput, title: value })
	}

	function handleMovieDescrChange(e) {
		e.preventDefault()
		const value = e.target.value
		setMovieInput({ ...movieInput, description: value })
	}

	function handleMovieRuntimeChange(e) {
		e.preventDefault()
		const value = e.target.value
		setMovieInput({ ...movieInput, runtimeMins: value })
	}

	function handleCreateMovie(e) {
		e.preventDefault()
		const tokenItem = localStorage.getItem('token')
		fetch(`${apiUrl}/movie`, {
			method: 'POST',
			body: JSON.stringify({
				...movieInput,
				runtimeMins: Number(movieInput.runtimeMins),
			}),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${tokenItem}`,
			},
		})
			.then((response) => response.json())
			.then((response) => {
				setMovieList([...movieList, response.movie])
			})
			.catch((err) => {
				console.error(err)
			})
	}

	return (
		<div className="App">
			<form>
				<h1>Register</h1>
				<label>
					<input
						type="text"
						name="username"
						placeholder="Username"
						value={registerUser.username}
						onChange={handleRegisterChange}
						autoComplete="off"
					/>
				</label>
				<label>
					<input
						type="password"
						name="password"
						placeholder="Password"
						value={registerUser.password}
						onChange={handleRegisterChange}
						autoComplete="off"
					/>
				</label>
				<input
					type="submit"
					name="submit"
					value={'Submit'}
					onClick={handleRegister}
				/>

				<h1>Login</h1>
				<label>
					<input
						type="text"
						name="username"
						placeholder="Username"
						value={loginUser.username}
						onChange={handleLoginChange}
						autoComplete="off"
					/>
				</label>
				<label>
					<input
						type="password"
						name="password"
						placeholder="Password"
						value={loginUser.password}
						onChange={handleLoginChange}
						autoComplete="off"
					/>
				</label>
				<input
					type="submit"
					name="submit"
					value={'Submit'}
					onClick={handleLogin}
				/>

				<h1>Create movie</h1>
				<label>
					<input
						type="text"
						name="title"
						placeholder="Title"
						value={movieInput.title}
						onChange={handleMovieTitleChange}
					/>
				</label>
				<label>
					<input
						type="text"
						name="description"
						placeholder="Description"
						value={movieInput.description}
						onChange={handleMovieDescrChange}
					/>
				</label>
				<label>
					<input
						type="text"
						name="minutes"
						placeholder="Minutes"
						value={movieInput.runtimeMins}
						onChange={handleMovieRuntimeChange}
					/>
				</label>
				<input
					type="submit"
					name="submit"
					value={'Submit'}
					onClick={handleCreateMovie}
				/>
			</form>
			<h1>Movie List</h1>
			<ul>
				{movieList.map((movie) => (
					<li key={movie.id}>
						<h3>{movie.title}</h3>
						<p>Description: {movie.description}</p>
						<p>Runtime: {movie.runtimeMins}</p>
					</li>
				))}
			</ul>
		</div>
	)
}

export default App
