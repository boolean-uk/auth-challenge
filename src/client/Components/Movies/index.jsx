import './index.css'
import { useState } from 'react';
import { useEffect } from 'react';

function Movies () {
    const [movies, setMovies] = useState([])
    const [movieInput, setMovieInput] = useState({ title: '', description: '', runtime: '' })


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
                    type="text"
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
        <div>
            <ul>
                {movies.map((movie) => (
                    <>
                    <li>
                        {movie.title}
                    </li>
                    <li>
                        {movie.description}
                    </li>
                    <li>
                        {movie.runtime}
                    </li>
                </>  
                ))}
            </ul>
        </div>
    </>



    )

}

export default Movies