import { useState, useEffect } from "react"

export default function AdminDashboard() {
const [users, setUsers] = useState([])

useEffect(() => {
    async function getAllUsers() {
        const data = await fetch('http://localhost:3000/user/', {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        const json = await data.json()
        setUsers(json.users)
    }
    getAllUsers()
}, [])


    return (
        <section>
            {users.map((user, index) => {
                return <p key={`adminList${index}`}>{user.username}</p>
            })}

        </section>
    )
}