'use client'

import { useState, useEffect } from 'react'
import Form from '../../../components/form/Form'
import Navbar from '../../../components/navigation/navbar'
import { useRouter } from 'next/navigation'

export default function page() {
    const router = useRouter()
    const [token, setToken] = useState('')

    useEffect(() => {
        const getToken = localStorage.getItem('token')
        setToken(getToken || null)
    }, [])

    useEffect(() => {
        if (token === null) {
            router.push('/login')
        }
    }, [token])

    return (
        <>
            <Navbar token={token} setToken={setToken} />
            <section className="py-24 md:py-32 bg-white">
                <div className="container px-4 mx-auto">
                    <div className="mb-6 text-center">
                        <h3 className="mb-4 text-2xl md:text-3xl font-bold">
                            Add a new Moive!
                        </h3>
                        <p className="text-lg text-coolGray-500 font-medium">
                            Make sure it's a good one!
                        </p>
                    </div>
                    <Form type="movie" token={token}/>
                </div>
            </section>
        </>
    )
}
