import { Link } from "react-router-dom"

function Aside() {
    return (
      <aside>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/register'>Register</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/movie-list'>Movies</Link></li>
          <li><Link to='/admin-dashboard'>Dashboard</Link></li>
        </ul>
      </aside>
    )
  }
  
  export default Aside