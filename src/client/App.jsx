import './App.css';
import {useSate} from 'react'
import Form from './components/form';
import Input from './components/input';


const apiUrl = 'http://localhost:4000';

const handleRegister = (event) => {

}

const handleChange = (event) => {

}

function App() {
  return (
    <div className="App">
      <h1>Register</h1>
      <Form handleSubmit={handleRegister} className={"Register"} inputs = {[

        <Input type={'text'} name={'username'} placeholder={"Username"} handleChange={handleChange}/>,

        <Input type={'password'} name={'password'} placeholder={"Password"} handleChange={handleChange}/>
        
      ]}/>


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