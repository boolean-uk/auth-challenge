import { useState } from "react"
const InitialUserLogIn = {
    username: '',
    password: ''
  }

export default function Login ({setToken, apiUrl}) {
    const [logInUser, setLogInUser] = useState(InitialUserLogIn)

    const handleLoginInfo = (e) => {
        const {name} = e.target
        setLogInUser({...logInUser, [name]: e.target.value})
      }
    
      const handleLogin = (e) => {
        e.preventDefault()
    
        const logInDetails = {
          username: logInUser.username,
          password: logInUser.password
        }
    
        const options = {
          method: "post",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(logInDetails)
        }
        fetch(`${apiUrl}/user/login`, options)
        .then(function (response) {
            return response.json()
        })
        .then(data => {
          localStorage.setItem('Token', data.token)
          setToken(data.token)
        })
        e.target.reset()
      }
    return (
    <>
        <h2>Log In</h2>
        <form onSubmit={handleLogin}>
            <input type="text" name='username' placeholder='Username' onChange={handleLoginInfo}/>
            <input type="password" placeholder='Password' name='password' onChange={handleLoginInfo}/>
            <input type="submit" />
        </form>
    </>
    )
}