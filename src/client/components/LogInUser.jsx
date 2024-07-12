import { useState } from "react";

const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;

export default function LoginUser() {
    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials, [name]: value
        });  
        setSuccess(null)
        setError(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`${apiUrl}/users/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            const json = await response.json()
            if (json.token) {
                localStorage.setItem("jwt", json.token)                
                setSuccess('User loged-in successfully!');
                setCredentials({ username: '', password: '' });
                setError(null);
            } else {
                setError(json.error)
            }

        }catch (error) {
            setError(error.message);
        }
    }

    return (
                <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'lightgreen' }}>{success}</p>}
        </div>
    )
}