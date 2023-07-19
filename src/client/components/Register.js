import { useState } from "react"
const InitialNewUser = {
    username: '',
    password: ''
  }

export default function Register({apiUrl}){
    const [newUser, setNewUser] = useState(InitialNewUser)
    
    const handleRegisterInfo = (e) => {
        const { name } = e.target
        setNewUser({...newUser, [name]: e.target.value})
      }
    
      const handleRegister = (e) => {
        e.preventDefault()
    
        const user = {
          username: newUser.username,
          password: newUser.password
        }
    
          const options = {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }
      
        fetch(`${apiUrl}/user/register`, options)
        .then(function (response) {
            return response.json()
        })
        e.target.reset()
      }
    return (
        <>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input placeholder='Username' type="text" name='username' onChange={handleRegisterInfo}/>
                <input type="password" placeholder='Password' name='password' onChange={handleRegisterInfo}/>
                <input type="submit"/>
            </form>
        </>
    )
}