import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../../App.css';
import './index.css'

function UserLogin () {

    const [user, setUser] = useState({ username: '', password: ''})
    const [loginCompletion, setLoginCompletion] = useState('')

    const login = async (e) => {
        e.preventDefault();
 
        setUser({username: username, password: password})

        console.log(user)

        const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(user)
          })

          console.log(response)

          setRegisterResponse(response)

        

    };

    const handleChange = (e) => {
        const { value, name } = e.target;

        setUser({
            ...user,
            [name]: value
        });
    }

    return (

        <>
            <div className='headertext'>
                <h1>Log In</h1>
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
                        value={user.username}
                        onChange={handleChange}
                        />
                    </label>
                    <div>
                    <input
                        className='submitbutton'
                        type="submit"
                        name="Login"
                    />
                    </div>
                </form>
            </div>
        </>

     )
    }

export default UserLogin