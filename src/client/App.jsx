import { useState, useEffect } from 'react'
import './App.css'

const apiUrl = 'http://localhost:4000'
// This is where the api are in the backend

function App() {
	const newUser = {
		username: '',
		password: '',
		token: '',
	}
	const newMovie = {
		title: '',
		description: '',
		runtimeMins: '',
	}

	const [movies, setMovies] = useState([])
	const [movie, setMovie] = useState(newMovie)
	const [user, setUser] = useState(newUser)
	const [saveUser, setSaveUser] = useState(newUser)
	const [error, setError] = useState('')

	useEffect(() => {
		const movieList = getMovies()
	}, [])

	function handleUserChange(e) {
		e.preventDefault()
		const inputName = e.target.name
		const inputValue = e.target.value
		console.log('inputName', inputName)
		console.log('inputValue', inputValue)

		if (inputName === 'username') {
			setUser({ ...user, username: inputValue })
			console.log('user1', user)
		} else {
			setUser({ ...user, password: inputValue })
			console.log('user2', user)
		}
	}

	function getMovies() {
		fetch(`${apiUrl}/movie/`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		})
			.then((res) => {
				return res.json()
			})
			.then((data) => {
				setMovies(data.movies)
			})
	}

	function handleMovieTitleChange(e) {
		e.preventDefault()
		const value = e.target.value
		setMovie({ ...movie, title: value })
	}

	function handleMovieDescrChange(e) {
		e.preventDefault()
		const value = e.target.value
		setMovie({ ...movie, description: value })
	}

	function handleMovieRuntimeChange(e) {
		e.preventDefault()
		const value = e.target.value
		setMovie({ ...movie, runtimeMins: value })
	}

	function handleSubmit(e) {
		e.preventDefault()

		const inputName = e.target.name

		fetch(`${apiUrl}/user`, {
			method: 'POST',
			body: JSON.stringify(user),
			headers: { 'Content-Type': 'application/json' },
		})
			.then((res) => {
				res.json()
				if (res.status === 404) {
					setError('Invalid username or password')
				} else {
					return 'Error'
				}
			})
			.then((data) => {
				if (inputName === 'login') {
					setSaveUser({ ...saveUser, token: data.token })
					localStorage.setItem('token', `${saveUser.token}`)
				} else {
					setSaveUser({ ...saveUser, username: data.username })
				}
			})
	}
	function handleCreateMovie(e) {
		e.preventDefault()
		setMovies([...movies, movie])
		console.log('movie', movie)
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
					onClick={handleSubmit}
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
					onClick={handleSubmit}
				/>

				<h1>Create movie</h1>
				<label>
					<input
						type="text"
						name="title"
						placeholder="Title"
						value={movie.title}
						onChange={handleMovieTitleChange}
					/>
				</label>
				<label>
					<input
						type="text"
						name="description"
						placeholder="Description"
						value={movie.description}
						onChange={handleMovieDescrChange}
					/>
				</label>
				<label>
					<input
						type="text"
						name="minutes"
						placeholder="Minutes"
						value={movie.runtimeMins}
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
				{movies.map((movie) => (
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
