import { useState } from "react";

export default function UserForm() {
    const [user, setUser] = useState({username: "", password: ""});

    function handleSubmit(event) {
        event.preventDefault();
        
    }


    function handleInput(event) {
        const {name, value} = event.target;
        console.log("new event.target", event.target.value);

        setUser({
            ...user,
            [name]: value,
        })
    }

    return (
      <form className="user-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleInput}
        ></input>
        <input
          type="text"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleInput}
        ></input>
        <button type="submit">Submit</button>
      </form>
    );
}