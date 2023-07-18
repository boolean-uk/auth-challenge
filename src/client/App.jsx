import './App.css'
import React from 'react'
import { Login, Register, AddMovie } from './components'

export default function App () {

  return (
    <div className="App">
      <Register />
      <Login />
      <AddMovie />
    </div>
  )
}
