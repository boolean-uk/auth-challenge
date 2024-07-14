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
                <div>
            <Routes>
                <Route path="/" element={
                    <>
                        <div className='my-20 h-full grid gap-1 grid-cols-2'>
                            <div className='border-stone-700 rounded-md shadow-xl  grid gap-1 grid-cols-2 p-5 bg-stone-800'>
                            <h2>Login to view your Movie's list or add a new movie</h2>
                                <LoginUser apiUrl={apiUrl} />
                            </div>
                            <div className='border-stone-700 rounded-md shadow-xl  grid gap-1 grid-cols-2 p-5 bg-stone-800 overflow-auto'>
                            <p>Or, create an account if you do not have one</p>
                                <RegisterUser apiUrl={apiUrl} />
                            </div>
                        </div>
                    </>
                } />
                <Route path="/userpage" element={<UserPage username={username} />} />
            </Routes>
                </div>
    </>
    )
}