import { useState } from "react"

function UserForm({ handleSubmit }) {
    const [newUserData, setNewUserData] = useState({ 
        username: '', 
        password: '' 
    })

    function handleChange(e) {
        const { name, value } = e.target

        setNewUserData({
            ...newUserData,
            [name]: value
        })
    }

    function handleSubmitDecorator(e) {
        e.preventDefault()
        
        handleSubmit(newUserData)
        
        setNewUserData({ 
            username: '', 
            password: '' 
        })
    }

    return (
        <form onSubmit={handleSubmitDecorator}>
            <input type="text" name="username" placeholder="Username" value={newUserData.username} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={newUserData.password} onChange={handleChange} />
            <button type="submit">Submit</button>
        </form>
    )
  }
  
  export default UserForm