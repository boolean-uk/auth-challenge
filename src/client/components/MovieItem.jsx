export default function MovieItem ({ movie}){
         return (
            <li>
              <h3>{movie.title}</h3>
              <p>Description: {movie.description}</p>
              <p>Runtime: {movie.runtime}</p>
            </li>
          );
}