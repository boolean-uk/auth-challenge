import { atom } from 'jotai'

export const loginStateAtom = atom<'login' | 'signup'>('login') // Action handler
export const modalAtom = atom<boolean>(false) // Display login modal
export const refreshAtom = atom<boolean>(false) // Forceful refresh
export const showProfileMenuAtom = atom<boolean>(false) // Display profile menu
export const isEditingAtom = atom<boolean>(false) // Show editing form
export const isAddingAtom = atom<boolean>(false) // Show adding form
