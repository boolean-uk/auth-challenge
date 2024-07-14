import { Routes, Route, useLocation } from 'react-router-dom';
import RegisterUser from "./RegisterUser.jsx";
import LoginUser from "./LogInUser.jsx";
import UserPage from "./UserPage.jsx";

const port = import.meta.env.VITE_PORT;
const apiUrl = `http://localhost:${port}`;

export default function LandingPage() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const username = query.get('username');
    
    return (        
        <>
            <Routes>
                <Route path="/" element={
                    <>
                        <p>Login to view your Movies list or add a new movie</p>
                        <div>
                            <LoginUser apiUrl={apiUrl} />
                        </div>
                        <p>`Or, create an account if you do not have one`</p>
                        <div>
                            <RegisterUser apiUrl={apiUrl} />
                        </div>
                    </>
                } />
                <Route path="/userpage" element={<UserPage username={username} />} />
            </Routes>
    </>
    )
}