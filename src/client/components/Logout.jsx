function Logout() {

    const handleSubmit = () => {
        localStorage.clear()
    }

    return (
      <button className='logout-btn' type="submit" onClick={handleSubmit}>Logout</button>
    )
}

export default Logout