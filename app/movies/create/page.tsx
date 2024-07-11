'use client'

import { useState, useEffect } from 'react'
import Form from '../../../components/form/Form'
import { useRouter } from 'next/navigation'
import Navbar from '../../../components/navigation/navbar'

export default function page() {
    const router = useRouter()
    const [token, setToken] = useState('')

    useEffect(() => {
        setToken(localStorage.getItem('token') || '')
        if (token) {
            router.push('/')
        }
    }, [])

    return (
        <>
            <Navbar token={token} />
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
                    <Form type="movie" />
                </div>
            </section>
        </>
    )
}
