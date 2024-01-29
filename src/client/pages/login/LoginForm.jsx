import { useState } from "react"
import {postrequest } from "../../helpers/api-user-post"

const DEFAULT_FORM = {
    username: "", 
    password: ""
}

const LoginForm = () => {
    const [form, setForm] = useState(DEFAULT_FORM)
    const [message, setMessage] = useState("")
    
    const updateForm = (e) => setForm({...form, [e.target.name]: e.target.value})

    const login = (e) => {
        e && e.preventDefault()
        postrequest(form,"/login", setMessage)
    }

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