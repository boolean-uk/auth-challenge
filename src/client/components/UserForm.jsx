import { useState } from "react"
import { useLocation, Link } from "react-router-dom"

export default function UserForm({ handleSubmit }) {
  const [user, setUser] = useState({ username: "", password: "" })
  const location = useLocation()
  let pathName

  if (location.pathname === "/register") {
    pathName = "/login"
  }
  if (location.pathname === "/login") {
    pathName = "/movieList"
  }

  const handleSubmitDecorator = (e) => {
    e.preventDefault()
    handleSubmit(user)
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setUser({
      ...user,
      [name]: value,
    })
  }

  return (
    <form onSubmit={handleSubmitDecorator}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={user.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={user.password}
        onChange={handleChange}
      />
      <Link to={pathName}>
        <button type="submit">Submit</button>
      </Link>
    </form>
  )
}
