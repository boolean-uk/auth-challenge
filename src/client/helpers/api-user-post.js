const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;

const buildUrl = (endpoint) => `${apiUrl}/user${endpoint}`

const buildOptionsObject = (form) => {
    const options = {
        method: "POST", 
        headers: {"content-type":"application/json"}, 
        body: JSON.stringify(form)
    }
    return options
}

const addToLocalStorage = (token) => token && localStorage.setItem("token", token)

const handleResponse = (data) => {
        if(data.error) {
            window.alert(data.error)
        }
        let message = data.message
        if (!data.message && data.response) {
            addToLocalStorage(data.response.token)
            message = data.response.message
        }

        return message
}

const postrequest = (form, endpoint, setState) => {
    const options = buildOptionsObject(form)
    const url = buildUrl(endpoint)

    fetch(url, options)
    .then(res => res.json())
    .then(handleResponse)
    .then(setState)
}

export {
    postrequest
}