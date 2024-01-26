import { useEffect, useState } from "react"

const DEFAULT_FORM = {
    username: "", 
    password: ""
}

const LoginForm = ({ apiUrl }) => {
    const [form, setForm] = useState(DEFAULT_FORM)
    const [message, setMessage] = useState({})
    
    const updateForm = (e) => setForm({...form, [e.target.name]: e.target.value})

    const addToLocalStorage = ({ response }) => {
        const { message, token } = response
        message && setMessage( message)
        token && localStorage.setItem("token", token)
    }

    const login = (e) => {
        e && e.preventDefault()

        const data = {
            username: form.username,
            password: form.password
        }

        const options = {
            method: "POST", 
            headers: {"content-type":"application/json"}, 
            body: JSON.stringify(data)
        }

        fetch(`${apiUrl}/user/login`, options)
        .then(res => res.json())
        .then(addToLocalStorage)
    }
    
    useEffect(login, [])
    return(
        <>
            <form onSubmit={login}>
                <h2>Login</h2>
                <label>
                    <h3>username</h3>
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={updateForm} />
                </label>
                <label>
                    <h3>password</h3>
                    <input
                        type="text"
                        name="password"
                        value={form.password}
                        onChange={updateForm} />
                </label>
            <button type="submit">login</button>
            </form>
            {message &&      
                <div>
                    <h3>message</h3>
                    <p>{ message }</p>
                </div>}
        </>
    )
}

export { LoginForm }