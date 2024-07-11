'use client'
import { FormType } from '../../lib/definitions'
import { useState } from 'react'
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'


export default function Form({ type }: FormType) {
    const router = useRouter()
    const blankForm = {
        username: '',
        password: '',
        title: '',
        description: '',
        runtimeMins: '',
    }

    const [formData, setFormData] = useState({...blankForm})

    function formFields() {
        if (type === 'login' || type === 'register') {
            return (
                <>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </>
            )
        }

        if (type === 'movie') {
            return (
                <>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="runtimeMins"
                        id=""
                        value={formData.runtimeMins}
                        onChange={handleChange}
                    />
                </>
            )
        }
    }

    function handleChange(e) {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (type === 'register') {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                body: JSON.stringify(formData),
            })
            console.log(response)
            router.push('/')
        }

        if (type === 'login') {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify(formData),
            })
            const responseBody = await response.json()

            if (responseBody.error) {
                alert('error' + responseBody.error)
                return
            }

            localStorage.setItem('token', responseBody.token)
            router.push('/')
        }
        if (type === 'movie') {
            const response = await fetch('/api/movies', {
                method: 'POST',
                body: JSON.stringify(formData),
            })
            console.log(response)
            setFormData({...blankForm})
        }
    }

    return (
        <form onSubmit={onSubmit} method="POST">
            {formFields()}
            <input type="submit" value="Submit" />
        </form>
    )
}
