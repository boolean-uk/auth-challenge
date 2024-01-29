import { getMovies } from "./api-get";

const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;
const token = localStorage.getItem("token")

const buildUrl = () => `${apiUrl}/movie`

const buildOptionsObject = (form) => {
    const options = {
        method: "POST", 
        headers: {
            "content-type":"application/json", 
            "Authorization": token,
        }, 
        body: JSON.stringify(form)
    }
    return options
}

const handleResponse = (data, updateList) => {
        if(data.error) {
            window.alert(data.error)
        }
        getMovies(updateList)
}

const postrequestMovie = (form, updateList) => {
    const options = buildOptionsObject(form)
    const url = buildUrl()

    fetch(url, options)
    .then(res => res.json())
    .then((data) => handleResponse(data, updateList))
}

export { postrequestMovie }