import { useEffect, useState } from "react"

const DEFAULT_FORM = {
    username: "",
    password: ""
}

const RegisterForm = ({ apiUrl }) => {
    
    const [form, setForm] = useState(DEFAULT_FORM)
    const [message, setMessage] = useState({})
    
    const updateForm = (e) => setForm({...form, [e.target.name]: e.target.value})
    
    const data = {
        username: form.username,
        password: form.password,
    }
    const options = {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(data)
    }
    const registerUser = (e) => {
        e && e.preventDefault()
       fetch(`${apiUrl}/user/register`, options)
        .then(r => r.json())
        .then((data) => {
            if(data.error) {
                window.alert(data.error)
            }
            setMessage(data)
        })
    }

    useEffect(registerUser, [])

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
            {message.message &&
                <div>
                    <h3>message</h3>
                    <p>{ message.message }</p>
                </div>
            }
        </>
    )
}

export { RegisterForm }