import { Link } from 'react-router-dom';
import '../../App.css';
import './index.css'

function UserRegister () {



    return (

        <>
            <header>
                Register Your Account!
            </header>
            <div>
                <form>
                    <label>
                        <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        />
                    </label>
                    <label>
                        <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        />
                    </label>
                    <div>
                    <input
                        className='submitbutton'
                        type="submit"
                        name="Register"
                    />
                    </div>

                </form>
            </div>
        
        </>

    )
}

export default UserRegister