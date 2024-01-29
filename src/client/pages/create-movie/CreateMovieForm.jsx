import { useState } from "react"
const DEFAULT_FORM = {
    title: "",
    description: "",
    runtimeMins: 0,
}

const MovieForm = ({ apiUrl, getMovies}) => {
    const [form, setForm] = useState(DEFAULT_FORM)

    const updateForm = (e) => setForm({...form, [e.target.name]: e.target.value})

    const createMovie = (e) => {
        e && e.preventDefault()
        const data = {
            title: form.title,
            description: form.description,
            runtimeMins: form.runtimeMins
        }
        const token = localStorage.getItem("token")
        const options = {
            method: "POST",
            headers: {
                "Authorization": token,
                "content-type":"application/json",
            },
            body: JSON.stringify(data)
        }
        fetch(`${apiUrl}/movie`, options)
        .then(res => res.json())
        .then((data) => {
            if(data.error) {
                window.alert(data.error)
            }
            getMovies(data)
        })
    }

    return(
        <>
            <h2>Add a movie</h2>
            <form onSubmit={createMovie}>
                <label>
                    <h3>title:</h3>
                    <input 
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={updateForm}
                        />
                </label>
                <label>
                    <h3>description:</h3>
                    <input 
                        type="text"
                        name="description"
                        value={form.description}
                        onChange={updateForm}
                        />
                </label>
                <label>
                    <h3>runtime:</h3>
                    <input 
                        type="text"
                        name="runtimeMins"
                        value={form.runtimeMins}
                        onChange={updateForm}
                        />
                </label>
                <button type="submit">submit</button>
            </form>
        </>
    )
}

export { MovieForm }