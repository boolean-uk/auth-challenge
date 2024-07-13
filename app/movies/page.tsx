'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Navbar from '../../components/navigation/navbar'
import Movies from './Movies'

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
            <Movies />
        </>
    )
}
