import { Prisma } from '@prisma/client'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

// User Store
export const userDataAtom = atom<Prisma.UserUncheckedCreateInput | null>(null)
export const tokenAtom = atomWithStorage<string | null>('token', null)
export const userIdAtom = atomWithStorage<number | null>('userId', null)

// Input Buffer
export const inputNameAtom = atom<string>('')
export const inputEmailAtom = atom<string>('')
export const inputPasswordAtom = atom<string>('')
