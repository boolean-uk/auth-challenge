import Form from '../loginRegsier/form.jsx'
import backarrow from '../../assets/svg/backarrow.svg'
import { Link } from 'react-router-dom'

export default function RegisterForm() {
    const routeRequest = 'register'
    return (
        <div className="register_container">
            <section className="register_form_box">
                <header className='register_header'>
                    <h2>
                        Sign up!
                    </h2>
                    <h3>
                        Quick and easy sign up in order to create your list today!
                    </h3>
                </header>
                <main className='register_main'>
                    <Link to="/">
                    <img 
                    src={backarrow}
                    alt='backarrow'
                    id='backarrow'
                    className='icon'/>
                    </Link>
                    <Form route={routeRequest}/>
                </main>
            </section>
        </div>
    )
}