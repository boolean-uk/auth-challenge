function MovieForm({ onMovieFormSubmit, onMovieFormChange, moviesList }) {

	return (
		<div className='movie-form-container'>
			<form onSubmit={onMovieFormSubmit}>
				<div className='movie-form-title'>
					<h2>Add movie</h2>
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
