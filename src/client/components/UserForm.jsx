import { useState } from "react"

function UserForm({ handleSubmit, error, setError }) {
    const [userData, setUserData] = useState({ 
        username: '', 
        password: '' 
    })

    function handleChange(e) {
        const { name, value } = e.target

        setUserData({
            ...userData,
            [name]: value
        })
    }

    function handleSubmitDecorator(e) {
        e.preventDefault()

        if (!userData.username || !userData.password) {
            setError('Missing fields in body')

            return
        }

        setError(null)
        
        handleSubmit(userData)
        
        setUserData({ 
            username: '', 
            password: '' 
        })
    }

    return (
        <form onSubmit={handleSubmitDecorator}>
            {error && <p>{error}</p>}

            <input type="text" name="username" placeholder="Username" value={userData.username} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={userData.password} onChange={handleChange} />

            <button type="submit">Submit</button>
        </form>
    )
  }
  
  export default UserForm