import { useState } from "react"

export default function UserForm({ handleSubmit }) {
  const [user, setUser] = useState({ username: '', password: '' })

  const handleChange = (e) => {
    const { value, name } = e.target
    
    setUser({
      ...user,
      [name]: value
    })
  }

  const submitFunction = (e) => {
    e.preventDefault();
    handleSubmit(user)
  }

  return (
    <form onSubmit={submitFunction}>
      <input type='text' name='username' placeholder='Username' value={user.username} onChange={handleChange} />
      <input type='password' name='password' placeholder='Password' value={user.password} onChange={handleChange} />
      <button type='submit'>Submit</button>
    </form>
  )
}