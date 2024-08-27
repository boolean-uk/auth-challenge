import { ChangeEvent as Event } from 'react'

type InputType = {
    label: string
    type: string
    inputChange: (e: Event<HTMLInputElement>) => void
    inputValue: string
}

export default function Input({
    label,
    type,
    inputChange,
    inputValue,
}: InputType) {
    return (
        <div className='flex flex-col gap-4'>
            <label htmlFor={label.toLowerCase()}>
                {label[0].toUpperCase() + label.slice(1)}
            </label>
            <input
                required
                type={type}
                name={label.toLowerCase()}
                className='input'
                onChange={inputChange}
                value={inputValue}
            />
        </div>
    )
}
