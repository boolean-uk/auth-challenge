import Form from "../loginRegsier/form.jsx";
import backarrow from "../../assets/svg/backarrow.svg";
import { Link } from "react-router-dom";
import "../../styling/dashboard.css";

export default function LoginForm() {
  const routeRequest = "login";
  return (
    <div className="login_form_container">
      <section className="login_form_box">
        <main className="login_main">
          <h2>Login!</h2>
          <div className="login_main_form">
            <Link to="/">
              <img
                src={backarrow}
                alt="backarrow"
                className="icon"
                id="backarrow"
              />
            </Link>
            <Form route={routeRequest}/>
          </div>
        </main>
      </section>
    </div>
  );
}
