function MovieForm() {
	return (
		<div className='movie-form-container'>
			<form>
				<h2>Add new movie</h2>
				<input type='text' placeholder='Title' name='movieTitle' required />
				<input type='text' placeholder='Review' name='movieReview' required />
				<input
					type='number'
					placeholder='Duration'
					name='movieDuration'
					required
				/>
				<input type='submit' value='Add movie' id='submit' />
			</form>
		</div>
	);
}

export default MovieForm;
