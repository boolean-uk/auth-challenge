'use client'

import { useState } from 'react'
import Navbar from '../../components/navigation/navbar'
import Movies from './Movies'

export default function page() {
    const [token, setToken] = useState('token')

    return (
        <>
            <Navbar token={token} setToken={setToken} />
            <Movies />
        </>
    )
}
