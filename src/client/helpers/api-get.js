const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;
const token = localStorage.getItem("token")

const getMovies = (setState) => {
    const options = {
        method: "GET",
        headers: {"content-type":"application/json"}
    }
    fetch(`${apiUrl}/movie`, options)
    .then(res => res.json())
    .then(setState)
}

const getMyMovies = (setState) => {
    const options = {
        method: "GET",
        headers: {
            "content-type":"application/json",
            "Authorization": token,
        }
    }
    fetch(`${apiUrl}/movie/mylist`, options)
    .then(res => res.json())
    .then((data) => {
        if(data.error) {
            window.alert(data.error)
        }
        setState(data.movies)
    })
}

export { 
    getMovies, 
    getMyMovies
}