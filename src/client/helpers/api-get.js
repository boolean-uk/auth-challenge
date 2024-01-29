const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;

const getMovies = (setState) => {
    const options = {
        method: "GET",
        headers: {"content-type":"application/json"}
    }
    fetch(`${apiUrl}/movie`, options)
    .then(res => res.json())
    .then(setState)
}

export { getMovies }