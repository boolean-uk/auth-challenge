export type FormType = { type: 'login' | 'register' | 'movie'; token?: string }

export type AccountCredentials = { username: string; password: string }

export type MovieDetails = {
    title: string
    description: string
    runtimeMins: number
}

export type UserInfo = {
    id: number
    username: string
    passwordHash: string
    createdAt: Date
    updatedAt: Date
    role: 'ADMIN' | 'USER'
    isAdmin?: boolean
}

export interface UserToSearchFor {
    where: { id?: number; username?: string }
}
