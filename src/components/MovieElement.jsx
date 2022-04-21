function MovieElement({ moviesList }) {
	return (
		<div className='movies-list-container'>
			{moviesList.map((movie) => {
				return (
					<div className='movie-item-container' key={movie.id}>
						<h3 className='movie-title'>🎞 {movie.title}</h3>
						<br />
						<p>Description:</p>
						<p className='movie-description'>{movie.description}</p>
						<br />
						<p className='movie-duration'>Duration: {movie.runtimeMins} mins</p>
					</div>
				);
			})}
		</div>
	);
}

export default MovieElement;
