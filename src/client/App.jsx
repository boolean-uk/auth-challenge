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
	const initialMovieInput = {
		title: '',
		description: '',
		runtimeMins: '',
	}

	const [movieList, setMovieList] = useState([])
	const [movieInput, setMovieInput] = useState(initialMovieInput)
	const [user, setUser] = useState(initialUserInput)
	const [saveUser, setSaveUser] = useState(initialUserInput)
	const [error, setError] = useState('')

	useEffect(() => {
		const movieList = getMovies()
	}, [])

	// User
	function handleUserChange(e) {
		e.preventDefault()
		const inputName = e.target.name
		const inputValue = e.target.value

		if (inputName === 'username') {
			setUser({ ...user, username: inputValue })
		} else {
			setUser({ ...user, password: inputValue })
		}
	}

	function handleRegister(e) {
		e.preventDefault()

		fetch(`${apiUrl}/user/register`, {
			method: 'POST',
			body: JSON.stringify(user),
			headers: { 'Content-Type': 'application/json' },
		})
			.then((response) => response.json())
			.then((response) => {
				setSaveUser({ ...saveUser, token: data.token })
			})
			.catch((err) => {
				console.error(err)
			})
	}
	function handleLogin(e) {
		e.preventDefault()

		fetch(`${apiUrl}/user/login`, {
			method: 'POST',
			body: JSON.stringify(user),
			headers: { 'Content-Type': 'application/json' },
		})
			.then((response) => response.json())
			.then((response) => {
				setSaveUser({ ...saveUser, token: data.token })
				localStorage.setItem('token', `${saveUser.token}`)
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
						value={user.username}
						onChange={handleUserChange}
					/>
				</label>
				<label>
					<input
						type="password"
						name="password"
						placeholder="Password"
						value={user.password}
						onChange={handleUserChange}
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
						name="user"
						placeholder="Username"
						value={user.username}
						onChange={handleUserChange}
					/>
				</label>
				<label>
					<input
						type="password"
						name="passw"
						placeholder="Password"
						value={user.password}
						onChange={handleUserChange}
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
