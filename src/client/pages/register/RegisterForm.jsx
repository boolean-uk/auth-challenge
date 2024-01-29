import { useState } from "react"
import { postrequest } from "../../helpers/api-calls"

const DEFAULT_FORM = {
    username: "",
    password: ""
}

const RegisterForm = () => {
    
    const [form, setForm] = useState(DEFAULT_FORM)
    const [message, setMessage] = useState("")
    
    const updateForm = (e) => setForm({...form, [e.target.name]: e.target.value})

    const registerUser = (e) => {
        e && e.preventDefault()
        postrequest(form, "/register", setMessage)
    }

    return(
        <>
            <form onSubmit={registerUser} >
                <h2>Register</h2>
                <label> 
                    <h3>username</h3>
                    <input 
                        type="text" 
                        name="username"
                        value={form.username}
                        onChange={updateForm}
                        />
                </label>
                <label> 
                    <h3>password</h3>
                    <input 
                        type="text" 
                        name="password"
                        value={form.password}
                        onChange={updateForm}
                        />
                </label>
                <button type="submit">register</button>
            </form>
            {message &&
                <div>
                    <h3>message</h3>
                    <p>{ message }</p>
                </div>
            }
        </>
    )
}

export { RegisterForm }