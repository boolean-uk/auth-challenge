export default function LoginForm({ handleInput, handleSubmit }) {
  return (
    <form onChange={handleInput} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input name="username" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input name="password" type="password" />
      </div>
      <button>Login</button>
    </form>
  )
}