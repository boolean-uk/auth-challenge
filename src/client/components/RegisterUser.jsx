import axios from "axios";
import { useState } from "react";
import UserForm from "./UserForm"

function RegisterUser({ apiUrl }) {
    const [registerMessage, setRegisterMessage] = useState('')

    const handleRegister = async ({ username, password }) => {
        try {
          const { data } = await axios.post(`${apiUrl}/user/register`, {
            username,
            password
          }, {
              headers: { 'Content-Type': 'application/json' },
            }
          )
          setRegisterMessage(data.message)
        }
        catch (err) {
          setRegisterMessage(err.response.data.error)
        }
      };

    return (
        <div className="home--form-container home--register-container grid">
            <h1>Register</h1>
            <UserForm handleSubmit={handleRegister} />
            {registerMessage && <p>{registerMessage}</p>}
        </div>
    )
}

export default RegisterUser