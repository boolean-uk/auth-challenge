'use client'

import { useState, useEffect } from 'react'
import Navbar from '../../components/navigation/navbar'
import Movies from './Movies'

export default function page() {
    const [token, setToken] = useState(null)

    useEffect(() => {
        const getToken = localStorage.getItem('token')
        setToken(getToken || null)
    }, [])

    return (
        <>
            <Navbar token={token} setToken={setToken} />
            <Movies />
        </>
    )
}
