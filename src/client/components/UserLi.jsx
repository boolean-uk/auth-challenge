import { useContext } from "react"
import { DataContext } from "../App"

function UserLi({ user, setUsers, users }) {
    const { apiUrl } = useContext(DataContext)

    async function handleDelete() {
        const options = {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`
          },
        }
    
        const response = await fetch(apiUrl + `/user/${user.id}`, options)
        const data = await response.json()
    
        setUsers([
            ...users.filter((u) => u.id !== data.data.id)
        ])

    }

    return (
        <li className="movie-li">
            <h3>{user.username}</h3>
            <p>Id: {user.id}</p>
            <p>Role: {user.role}</p>

            <button onClick={handleDelete}>Delete</button>
        </li>
    )
  }
  
  export default UserLi