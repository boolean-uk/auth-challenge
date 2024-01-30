import '../styles/logout.css'

import { useNavigate } from "react-router-dom"

function Logout() {
  const navigate = useNavigate()

    const handleSubmit = () => {
      const token = localStorage.getItem('token')
      if (token) {
        localStorage.clear()
        navigate('/')
      }
    }

    return (
      <button className='logout-btn' type="submit" onClick={handleSubmit}>Logout</button>
    )
}

export default Logout