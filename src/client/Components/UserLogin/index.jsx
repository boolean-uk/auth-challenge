import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../../App.css';
import './index.css'

function UserLogin () {

    const [user, setUser] = useState({ username: '', password: ''})
    const [loginCompletion, setLoginCompletion] = useState('')

    const login = async (e) => {
        e.preventDefault();

        useEffect(() => {
            if (loginCompletion.status === 200) {
            navigate("/movies");
            }
        }, [loginCompletion.status]);

        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(user)
          })
          .then(res => {
            setLoginCompletion(res)
           return res.json()
        })
          .then((data) => localStorage.setItem("token", data.data))
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
                        value={user.password}
                        onChange={handleChange}
                        />
                    </label>

                    {loginCompletion.status === 200 && <p>Login Successful</p>}
                    {loginCompletion.status === 401 && <p>Username or Password Not Recognised</p>}
                    {loginCompletion.status === 500 && <p>Server Error</p>}

                    <div>
                    <input
                        className='submitbutton'
                        type="submit"
                        name="Login"
                        onClick={login}
                    />
                    </div>
                </form>
            </div>
        </>

     )
    }

export default UserLogin