import { useState } from "react"
import enter from '../../assets/svg/enter.svg'
import AddFilm from "../films/addFilm"
import LoginForm from "../login/loginForm"

export default function Form({route}) {
    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    function handleChange(e) {
        const {name, value} = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        if(user.username.length > 20) {
            return alert('Username must be no more than 20 characters')
        }

        if(user.username === "" || user.password === "") {
            return alert('Username or password fields are missing')
        }

        fetch(`http://localhost:4040/${route}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'
                 },
                body: JSON.stringify(user)
            }
        )

        if(route === 'login') {
            <AddFilm />
        }
        if(route === 'register') {
            <LoginForm />
        }

        setUser({
            username: '',
            password: ''
        })
    }

    return (
        <form
        name="form"
        id="form"
        onSubmit={(e) => handleSubmit(e)}>
            <input 
            name="username"
            type="text"
            placeholder="Username"
            id="username_input"
            className="text_input"
            value={user.username}
            required
            onChange={(e) => handleChange(e)}/>
            <input 
            name="password"
            type="text"
            placeholder="Password"
            id="password_input"
            className="text_input"
            value={user.password}
            required
            onChange={(e) => handleChange(e)}
            />
            <button name="submit" type="submit" className="enter_button">
                <img
                src={enter}
                className="icon"
                id="enter_form"
                alt="enter icon"
                />
            </button>
        </form>
    )
}