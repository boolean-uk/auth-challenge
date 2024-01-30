import RegisterUser from "./RegisterUser"
import LoginUser from "./LoginUser"

import '../styles/home.css'

function Home({ apiUrl }) {

    return (
        <section className="home--container grid">
          <RegisterUser apiUrl={apiUrl} />
          <LoginUser apiUrl={apiUrl} />
        </section>
    )
}

export default Home