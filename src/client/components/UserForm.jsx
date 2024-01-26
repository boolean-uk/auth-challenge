import { useState } from "react";
const port = import.meta.env.VITE_PORT;
const url = 'http://localhost:';

console.log(`${url}${port}/user/register`)

export default function UserForm({ handleSubmit }) {
    const [user, setUser] = useState({ username: '', password: '' });

    const handleSubmitDecorator = (e) => {
        e.preventDefault();
        handleSubmit(user);
        createNewUser()
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUser({
            ...user,
            [name]: value
        });
    };

    const createNewUser = async () => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        };
    
        try {
            const response = await fetch(`${url}${port}/user/register`, options);
    
            if (response.ok) {
                const newUser = await response.json(); 
                console.log('Here is the user', newUser);
            } else {
                console.log('Error occurred while trying to post:', response.status, response.statusText);
            }
        } catch (err) {
            console.error('Error during fetch:', err);
        }
    };
    
    return (
        <form onSubmit={handleSubmitDecorator}>
            <input type="text" name="username" placeholder="Username" value={user.username} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} />
            <button type="submit">Submit</button>
        </form>
    );
}