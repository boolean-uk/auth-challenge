import './index.css'
import { useState } from 'react';
import { useEffect } from 'react';

function Movies () {
    const [movies, setMovies] = useState([])
    const [movieInput, setMovieInput] = useState({ title: '', description: '', runtime: undefined })

    useEffect(() => {
        fetch(`http://localhost:4000/movies`)
          .then((res) => res.json())
          .then((res) => setMovies(res.data));
      }, []);

    const createMovie = async (e) => {
        e.preventDefault()

        await fetch('http://localhost:4000/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(movieInput)
        })
        .then(res => {
           console.log(res)
           return res.json()
        })
        .then((data) => setMovies([...movies, data.data]));

    }

    const handleChange = (e) => {
        const { value, name } = e.target;

        setMovieInput({
            ...movieInput,
            [name]: value
        });
    }

    console.log(movieInput)

    return (

        <>
        <div className='headertext'>
            <h1>Movies</h1>
        </div>
        <div>
            <form>
                <label>
                    <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={movieInput.title}
                    onChange={handleChange}
                    />
                </label>
                <label>
                    <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={movieInput.description}
                    onChange={handleChange}
                    />
                </label>
                <label>
                    <input
                    type="number"
                    name="runtime"
                    placeholder="Run Time"
                    value={movieInput.runtime}
                    onChange={handleChange}
                    />
                </label>


                <div>
                <input
                    className='submitbutton'
                    type="submit"
                    name="Login"
                    onClick={createMovie}
                />
                </div>
            </form>
        </div>
        <section className='moviecontainer'>
                    <div>
                        <strong>Movie Title</strong>
                    </div>
                    <div>
                    <strong>Movie Description</strong>
                    </div>
                    <div>
                        <strong>Movie Duration (Mins)</strong>
                    </div>
                {movies.map((movie) => (
                    <>
                    <div>
                        {movie.title}
                    </div>
                    <div>
                        {movie.description}
                    </div>
                    <div>
                        {movie.runtimeMins}
                    </div>
                </>  
                ))}
        </section>
    </>



    )

}

export default Movies