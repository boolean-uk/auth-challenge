import './App.css';

const apiUrl = 'http://localhost:4000';

function App() {
  return (
    <div className="App">
      <h1>Register</h1>
      <form className='register'>
        <input type='text' id='username1' name='username1' placeholder='Username'/>
        <input type='password' id='pwd1' name='pwd1' placeholder='Password'/>
        <button>Submit</button>
      </form>

      <h1>Login</h1>
      <form className='login'>
        <input type='text' id='username2' name='username2' placeholder='Username'/>
        <input type='password' id='pwd2' name='pwd2' placeholder='Password'/>
        <button>Submit</button>
      </form>


      <h1>Create a Movie</h1>
      <form className='createMovie'>
        <input type='text' id='title' name='title' placeholder='Title'/>
        <input type='text' id='description' name='description' placeholder='Description'/>
        <input type="number" id='num' name='num' placeholder='Runtime'/>
        <button>Submit</button>
      </form>

      <h1>Movie List</h1>

      <ul>
        {/* Code that will be implemented here later */}
      </ul>

    </div>
  );
}

export default App;