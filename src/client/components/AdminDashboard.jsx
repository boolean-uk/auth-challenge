import { useEffect, useState } from "react"
import { useContext } from "react"
import { DataContext } from "../App"
import UserLi from "./UserLi"

function AdminDashboard() {
    const { apiUrl } = useContext(DataContext)
    const [users, setUsers] = useState([])
    const [adminError, setAdminError] = useState(null)

    useEffect(() => {
        async function getUsers() {
            const options = {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                },
            }
    
            const response = await fetch(apiUrl + '/user', options)

            if (response.status >= 400) {
                const errorText = await response.text()
                const errorData = JSON.parse(errorText)
        
                setAdminError(errorData.error)
        
                return
            }

            setAdminError(null)

            const data = await response.json()
        
            setUsers(data.data)
        }
    
        getUsers()
      }, [apiUrl, setUsers])

    return (
        <div className="dahsboard">
            <div>
                {adminError && <p className="error-message">{adminError}</p>}
            </div>

            <div className="user-list">
                <h2>User list</h2>
                <ul className='user-ul'>
                {users.map((user, index) => {
                    return <UserLi key={index} user={user} users={users} setUsers={setUsers}/>})
                }
                </ul>
            </div>
        </div>
    )
  }
  
  export default AdminDashboard