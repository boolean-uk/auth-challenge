'use client'

import { useState } from 'react'
import Form from '../../components/form/Form'
import Navbar from '../../components/navigation/navbar'

export default function page() {
    const [token, setToken] = useState(localStorage.getItem('token'))
    
    return (
        <>
            <Navbar token={token}/>
            <h1>Register</h1>
            <Form type="register" />
        </>
    )
}
