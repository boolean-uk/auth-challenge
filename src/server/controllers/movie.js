// TODO: Remove this
const testMovie = {
	title: 'Dodgeball',
	description: 'The best movie',
	runtime: 60,
}
const testMovie2 = {
	title: 'Matrix',
	description: 'The best',
	runtime: 60,
}
const getMovies = async (req, res) => {
	res.status(200).json({ movies: [testMovie, testMovie2] })
}

module.exports = {
	getMovies,
}
