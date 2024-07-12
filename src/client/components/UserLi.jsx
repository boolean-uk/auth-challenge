function UserLi({ user }) {

    return (
        <li className="movie-li">
            <h3>{user.username}</h3>
            <p>Id: {user.id}</p>
            <p>Role: {user.role}</p>
        </li>
    )
  }
  
  export default UserLi