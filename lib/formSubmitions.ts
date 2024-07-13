

export async function register(formData) {
    const response = await fetch('/api/users/register', {
        method: 'POST',
        body: JSON.stringify(formData),
    })

    const responseBody = await response.json()

    if (responseBody.error) {
        return responseBody
    }

    return responseBody
}

export async function login(formData) {
    const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify(formData),
    })
    const responseBody = await response.json()

    if (responseBody.error) {
        return responseBody
    }

    return responseBody
}

export async function createMovie(formData) {
    const response = await fetch('/api/movies', {
        method: 'POST',
        body: JSON.stringify(formData),
    })

    return await response.json()
}
