export default function Form() {
    return (
        <form
        name="form"
        id="form">
            <input 
            name="username"
            type="text"
            placeholder="Username"
            id="username_input"
            className="text_input"
            required/>
            <input 
            name="password"
            type="text"
            placeholder="Password"
            id="password_input"
            className="text_input"
            required
            />
        </form>
    )
}