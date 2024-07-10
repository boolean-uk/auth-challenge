'use client'

import { useState , useEffect } from 'react'
import Form from '../../components/form/Form'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/navigation/navbar'

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
            <h1>Log In</h1>
            <Form type="login" />
        </>
    )
}
