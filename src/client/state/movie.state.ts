import { Prisma } from '@prisma/client'
import { atom } from 'jotai'

export const moviesAtom = atom<Prisma.MovieUncheckedCreateInput[] | null>(null)

// Input Buffer
export const inputTitleAtom = atom<string>('')
export const inputDescriptionAtom = atom<string>('')
export const inputCoverAtom = atom<string>('')
export const inputRuntimeAtom = atom<string>('')

// Editing Buffer
export const editTitleAtom = atom<string>('')
export const editDescriptionAtom = atom<string>('')
export const editCoverAtom = atom<string>('')
export const editRuntimeAtom = atom<string>('')
