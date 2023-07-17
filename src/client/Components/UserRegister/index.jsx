import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../../App.css';
import './index.css'

function UserRegister () {

    const [user, setUser] = useState({ username: '', password: ''})
    const [registerCompletion, setRegisterCompletion] = useState('')

    const register = (e) => {
        e.preventDefault();

        console.log(user)

        const response = fetch('http://localhost:4000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(user)
          })

          console.log(response)

          setRegisterCompletion(response)
    }

    const handleChange = (e) => {
        const { value, name } = e.target;

        setUser({
            ...user,
            [name]: value
        });
    }

    return (
        <>
            <header>
                <div>
                    <p>Already have an account?</p>
                </div>
                <div>
                    <Link to="login"> <button className='signin'> Sign In </button> </Link>
                </div>
            </header>
            <div className='headertext'>
                <h1>Register Your Account!</h1>
            </div>
            <div>
                <form>
                    <label>
                        <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={user.username}
                        onChange={handleChange}
                        />
                    </label>
                    <label>
                        <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        value={user.password}
                        />
                    </label>
                    <div>
                    <input
                        className='submitbutton'
                        type="submit"
                        name="Register"
                        onClick={register}
                    />
                    </div>
                </form>
            </div>
        </>

    )
}

export default UserRegister