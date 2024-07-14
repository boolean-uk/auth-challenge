export async function register(formData) {
    const response = await fetch('/api/users/register', {
        method: 'POST',
        body: JSON.stringify(formData),
    })

    const responseBody = await response.json()


    return responseBody
}

export async function login(formData) {
    const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify(formData),
    })
    const responseBody = await response.json()


    return responseBody
}

export async function createMovie(formData, token) {
    const response = await fetch('/api/movies', {
        headers:{'Authorization': `Bearer ${token}`},
        method: 'POST',
        body: JSON.stringify(formData),
    })

    const responseBody = await response.json()

    return await responseBody
}
