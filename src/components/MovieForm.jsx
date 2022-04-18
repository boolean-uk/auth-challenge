function MovieForm() {
	return (
		<div className='movie-form-container'>
			<form>
				<div className='movie-form-title'>
					<h2>Add movie</h2>
				</div>
				<div className='movie-form-inputs'>
					<input
						type='text'
						id='movie-title'
						placeholder='Title'
						name='movieTitle'
						required
					/>
					<input
						type='text'
						id='movie-review'
						placeholder='Review'
						name='movieReview'
						required
					/>
					<input
						type='number'
						id='movie-duration'
						placeholder='Duration'
						name='movieDuration'
						required
					/>
					<input type='submit' value='Add movie' id='submit' />
				</div>
			</form>
		</div>
	);
}

export default MovieForm;
