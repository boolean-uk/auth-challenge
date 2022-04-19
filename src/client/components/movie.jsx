import Form from "./form";
import Item from "./item";

function Movie(props) {
  const {
    handleCreateMovie,
    handleCreateMovieItem,
    movie,
    moviesList,
    message,
  } = props;

  return (
    <div className='App'>
      <Form
        formname='Add New movie'
        handleSubmit={handleCreateMovie}
        inputs={[
          <Item
            type='text'
            placeholder='Title'
            name='title'
            value={movie.title}
            handleChange={handleCreateMovieItem}
          />,
          <Item
            type='text'
            placeholder='Description'
            name='description'
            value={movie.description}
            handleChange={handleCreateMovieItem}
          />,
          <Item
            type='number'
            placeholder='Runtime Mins'
            name='runtimeMins'
            value={movie.runtimeMins}
            handleChange={handleCreateMovieItem}
          />,
        ]}
      />

      {message && <p>{message}</p>}

      <h2>Movies List</h2>

      {moviesList.map((movie) => (
        <div>
          <h3>{movie.title}</h3>
          <p>Description: {movie.description}</p>
          <p>Runtime: {movie.runtimeMins} mins</p>
        </div>
      ))}
    </div>
  );
}

export default Movie;
