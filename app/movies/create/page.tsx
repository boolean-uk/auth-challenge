'use client'

import { useState, useEffect } from 'react'
import Form from '../../../components/form/Form'
import Navbar from '../../../components/navigation/navbar'
import { useRouter } from 'next/navigation'
import MovieForm from '../MovieForm'

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
            <MovieForm token={token}/>
        </>
    )
}
