import type { AxiosResponse } from 'axios'
import axios from 'axios'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useState } from 'react'
import Input from './components/Input'
import { API_LOGIN_URL, API_REGISTER_URL } from '../../const'
import { loginStateAtom, modalAtom } from '../../state/ui.state'
import {
    tokenAtom,
    userIdAtom,
    inputNameAtom,
    inputEmailAtom,
    inputPasswordAtom,
} from '../../state/user.state'

export default function LoginModal() {
    const [errorMessage, setErrorMessage] = useState('')
    const login = useAtomValue(loginStateAtom)
    const setDisplay = useSetAtom(modalAtom)
    const setToken = useSetAtom(tokenAtom)
    const setUserId = useSetAtom(userIdAtom)
    const [name, setName] = useAtom(inputNameAtom)
    const [email, setEmail] = useAtom(inputEmailAtom)
    const [password, setPassword] = useAtom(inputPasswordAtom)

    const loginSwitch = (): boolean => {
        switch (login) {
            case 'login':
                return true
            case 'signup':
                return false
        }
    }

    const loginToState = (res: AxiosResponse) => {
        console.log(res)
        setUserId(res.data.user.id)
        setToken(res.data.token)
        setDisplay(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            let res: AxiosResponse | void

            switch (login) {
                case 'login':
                    res = await axios
                        .post(API_LOGIN_URL, {
                            email,
                            password,
                        })
                        .then((res) => loginToState(res))
                    break

                case 'signup':
                    res = await axios
                        .post(API_REGISTER_URL, {
                            name,
                            email,
                            password,
                        })
                        .then((res) => loginToState(res))
                    break
            }
        } catch (error: any) {
            console.error('ERROR: Authentication failed: ', error)
            setErrorMessage(error.message)
            setDisplay(true)
        }
    }

    return (
        <div className='fixed left-0 top-0 z-10 flex size-full items-center justify-center pl-24 pt-24 backdrop-blur-sm'>
            <div className='card rounded-2xl bg-base-300 p-4'>
                <div className='flex justify-between pb-4'>
                    <h1 className='card-title'>
                        {loginSwitch()
                            ? 'Log in to your user'
                            : 'Create a new user'}
                    </h1>
                    <button
                        className='btn rounded-full'
                        onClick={() => setDisplay(false)}
                    >
                        X
                    </button>
                </div>
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className='flex w-96 flex-col gap-8'
                >
                    {!loginSwitch() ? (
                        <Input
                            label='name'
                            type='text'
                            inputChange={(e) => setName(e.target.value)}
                            inputValue={name}
                        />
                    ) : (
                        <></>
                    )}
                    <Input
                        label='email'
                        type='text'
                        inputChange={(e) => setEmail(e.target.value)}
                        inputValue={email}
                    />
                    <Input
                        label='password'
                        type='password'
                        inputChange={(e) => setPassword(e.target.value)}
                        inputValue={password}
                    />
                    <input type='submit' className='btn' />
                    <p className='text-center text-error'>{errorMessage}</p>
                </form>
            </div>
        </div>
    )
}
