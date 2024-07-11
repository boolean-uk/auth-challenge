import Form from '../loginRegsier/form.jsx'
import backarrow from '../../assets/svg/backarrow.svg'
import { Link } from 'react-router-dom'
import '../../styling/dashboard.css'

export default function LoginForm() {
    const routeRequest = 'login'
    return (
        <div className="login_form_container">
            <section className="login_form_box">
                <header className='login_header'>
                    <h2>
                        Login!
                    </h2>
                </header>
                <main className='login_main'>
                    <Link to="/">
                    <img 
                    src={backarrow}
                    alt='backarrow'
                    className='icon'
                    id='backarrow'/>
                    </Link>
                    <Form route={routeRequest}/>
                </main>
            </section>
        </div>
    )
}