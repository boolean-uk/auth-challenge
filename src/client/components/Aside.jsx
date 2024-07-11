import { Link } from "react-router-dom"

function Aside() {
    return (
        <>
          <Link to='/'>Home</Link>
          <Link to='/register'>Register</Link>
          <Link to='/login'>Login</Link>
          <Link to='/movie-list'>Movies</Link>
        </>
    )
  }
  
  export default Aside