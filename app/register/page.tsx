'use client'

import { useState, useEffect } from 'react'
import Form from '../../components/form/Form'
import Navbar from '../../components/navigation/navbar'

export default function page() {
    const [token, setToken] = useState(null)

    useEffect(() => {
        const getToken = localStorage.getItem('token')
        setToken(getToken || null)
    }, [])

    return (
        <>
            <Navbar token={token} setToken={setToken} />
            <section className="py-24 md:py-32 bg-white">
                <div className="container px-4 mx-auto">
                    <div className="mb-6 text-center">
                        <h3 className="mb-4 text-2xl md:text-3xl font-bold">
                            Register an Account
                        </h3>
                        <p className="text-lg text-coolGray-500 font-medium">
                            I promise, this is secure...enough
                        </p>
                    </div>
                    <Form type="register" />
                </div>
            </section>
        </>
    )
}
