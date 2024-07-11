'use client'

import { useState , useEffect } from 'react'
import Form from '../../components/form/Form'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/navigation/navbar'
import Movies from './Movies'

export default function page() {
    const router = useRouter()
    const [movies, setMovies] = useState([])
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
            <h1>Add New Movie</h1>
            <Form type="movie" />
        </>
    )
}