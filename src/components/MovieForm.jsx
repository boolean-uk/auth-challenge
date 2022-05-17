import { useState } from 'react';
const movieRoute = '/movie';
const movieFormInitialState = {
	title: '',
	description: '',
	runtimeMins: '',
};

function MovieForm({ apiUrl, moviesList, setMoviesList }) {
	const [movieRequestBody, setMovieRequestBody] = useState(movieFormInitialState);

	const onMovieFormChange = (e) => {
		setMovieRequestBody({	...movieRequestBody,	[e.target.name]: e.target.value,	});
	};

	const addMovieRequest = () => {
		fetch(`${apiUrl}${movieRoute}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'authorization': 'Bearer ' + localStorage.getItem('userToken'),
			},
			body: JSON.stringify(movieRequestBody),
		}).then((res) => {
			if (res.ok) {
				console.log(res)
				setMoviesList([...moviesList, jsonResponse.movie])
			} else alert('Please login again!')
		})
	};

	const onMovieFormSubmit = (e) => {
		e.preventDefault();
		addMovieRequest();
		setMovieRequestBody(movieFormInitialState);
	};

	return (
		<div className='movie-form-container'>
			<form onSubmit={onMovieFormSubmit}>
				<div className='movie-form-title'>
					<h2 className='movie-form-title-h2'>Add movie</h2>
				</div>
				<div className='movie-form-inputs'>
					<input
						type='text'
						id='movie-title'
						placeholder='Title'
						name='title'
						onChange={onMovieFormChange}
						required
					/>
					<input
						type='text'
						id='movie-review'
						placeholder='Review'
						name='description'
						onChange={onMovieFormChange}
						required
					/>
					<input
						type='number'
						id='movie-duration'
						placeholder='Duration'
						name='runtimeMins'
						onChange={onMovieFormChange}
						required
					/>
					<input type='submit' value='Add movie' id='submit' />
				</div>
			</form>
		</div>
	);
}

export default MovieForm;
