'use client'

import Navbar from '../components/navigation/navbar'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import angus from '../public/assets/angus_icon.jpg'

export default function Page() {
    //In future, will refactor to use cookies to manage the JWT.
    const [token, setToken] = useState(null)

    useEffect(() => {
        const getToken = localStorage.getItem('token')
        setToken(getToken || null)
    }, [])

    useEffect(() => {}, [token])
    return (
        <>
            <Navbar token={token} setToken={setToken} />
            <section className="py-24 md:pb-28 bg-white">
                <div className="container px-4 mx-auto">
                    <div className="relative max-w-5xl sm:px-6 pb-6 mb-10 mx-auto text-center">
                        <div className="relative">
                            <h2 className="text-2xl md:text-5xl font-semibold tracking-tighter">
                                Welcome, to my last Boolean Challenge
                            </h2>
                        </div>
                    </div>
                    <div className="text-center mb-8">
                        <Image
                            className="w-24 h-24 mx-auto mb-6 rounded-full"
                            src={angus}
                            width={500}
                            height={500}
                            alt=""
                        />

                        <h3 className="mb-2 text-xl md:text-2xl font-semibold">
                            Angus Townsley
                        </h3>
                        <span className="text-lg text-coolGray-500 font-medium">
                            Loose Cannon Software Developer
                        </span>
                    </div>
                    <div className="text-center">
                        <span className="inline-block h-3 w-3 mr-3 rounded-full bg-green-500"></span>
                    </div>
                </div>
            </section>
        </>
    )
}
