import React from "react"
import UserForm from "./UserForm"
import { useState } from "react"

export default function Register() {
  const [registeredResponse, setRegisteredResponse] = useState()

  const handleRegister = async ({ username, password }) => {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }
    fetch("http://localhost:4000/user/register", options)
      .then((res) => res.json())
      .then((json) =>
        setRegisteredResponse(
          "You have successfully registered with:" + json.data.username
        )
      )
      .catch(() => {
        setRegisteredResponse("Server error")
      })
  }

  return (
    <>
      <h1>Register</h1>
      <UserForm handleSubmit={handleRegister} />
      <p>{registeredResponse}</p>
    </>
  )
}
