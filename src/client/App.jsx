import './App.css';
import {useSate} from 'react'
import Form from './components/form';
import Input from './components/input';
import { placeholder } from '@babel/types';


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
      <Form handleSubmit={handleRegister} className={"Login"} inputs = {[
        <Input type={'text'} name={'username'} placeholder={"Username"} handleChange={handleChange}/>,
        
        <Input type={'password'} name={'password'} placeholder={"Password"} handleChange={handleChange}/>
      ]}/>


      <h1>Create a Movie</h1>
      <Form handleSubmit={handleRegister} className={"createMovie"} inputs = {[
        <Input type={'text'} name={'title'} placeholder={'Title'} handleChange={handleChange}/>,
        <Input type={'text'} name={'description'} placeholder={'Description'} handleChange={handleChange}/>,
        <Input type={'number'} name={'num'} placeholder={'Runtime'}/>
      ]}/>

      <h1>Movie List</h1>

      <ul>
        {/* Code that will be implemented here later */}
      </ul>

    </div>
  );
}

export default App;