const MovieElement = ({ movie }) => {
  const { title, description, runtimeMins } = movie

  return (
    <li className="movieElement">
      <h3 className="movieElement__title">{title}</h3>
      <p className="movieElement__description">{description}</p>
      <span className="movieElement__runTime">{runtimeMins} min</span>
    </li>
  )
}

export default MovieElement
