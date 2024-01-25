function Logout({ setLogoutMessage }) {

    const handleSubmit = () => {
      const token = localStorage.getItem('token')
      if (token) {
        localStorage.clear()
        setLogoutMessage('You have successfully logged out')
      }
    }

    return (
      <button className='logout-btn' type="submit" onClick={handleSubmit}>Logout</button>
    )
}

export default Logout