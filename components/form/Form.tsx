'use client'
import { FormType } from '../../lib/definitions'
import { useState } from 'react'
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import * as formSubmit from '../../lib/formSubmitions'

export default function Form({ type, token }: FormType) {
    const router = useRouter()
    const blankForm = {
        username: '',
        password: '',
        title: '',
        description: '',
        runtimeMins: '',
    }
    const labelClass = '"block mb-2 text-coolGray-800 font-medium"'
    const fieldClass =
        '"appearance-none block w-auto p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"'
    const [formData, setFormData] = useState({ ...blankForm })

    function formFields() {
        if (type === 'login' || type === 'register') {
            return (
                <>
                    <div className="mb-6">
                        <label className={labelClass} htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            className={fieldClass}
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label className={labelClass} htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className={fieldClass}
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                </>
            )
        }

        if (type === 'movie') {
            return (
                <>
                    <label className={labelClass} htmlFor="title">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        className={fieldClass}
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <label className={labelClass} htmlFor="description">
                        Description
                    </label>
                    <input
                        type="text"
                        name="description"
                        className={fieldClass}
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <label className={labelClass} htmlFor="runtimeMins">
                        Runtime, in minutes
                    </label>
                    <input
                        type="number"
                        name="runtimeMins"
                        className={fieldClass}
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

        switch (type) {
            case 'register': {
                const registerRequest = await formSubmit.register(formData)

                if (!!registerRequest.error) {
                    alert('Error: ' + registerRequest.error)
                    return
                }

                const loginRequest = await formSubmit.login(formData)

                if (!!loginRequest.error) {
                    alert('Error: ' + loginRequest.error)
                    return
                }

                localStorage.setItem('token', loginRequest.token)
                router.push('/')
                break
            }

            case 'login': {
                const loginResponse = await formSubmit.login(formData)
                if (!!loginResponse.error) {
                    alert('Error: ' + loginResponse.error)
                    return
                }
                localStorage.setItem('token', loginResponse.token)
                router.push('/')
                break
            }

            case 'movie': {
                const movieResponse = await formSubmit.createMovie(
                    formData,
                    token
                )
                if (!!movieResponse.error) {
                    alert('Error: ' + movieResponse.error)
                    return
                }
                setFormData({ ...blankForm })
                alert('Succesfully Created Movie!')
                break
            }

            default: {
                alert('Unknown form submission type')
                break
            }
        }
    }

    return (
        <form onSubmit={onSubmit} method="POST">
            {formFields()}
            <input
                type="submit"
                value="Submit"
                className="inline-block py-3 px-7 mb-6 w-auto text-base text-green-50 font-medium text-center leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
            />
        </form>
    )
}
