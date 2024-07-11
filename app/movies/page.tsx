'use client'

import { useState , useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/navigation/navbar'
import Movies from './Movies'

export default function page() {
    const router = useRouter()
    const [token, setToken] = useState('')

    useEffect(() => {
      setToken(localStorage.getItem('token') || '')
      if(token) {
        router.push('/')
      }
    }, [])

    return (
        <>
            <Navbar token={token} />
            <Movies/>
        </>
    )
}