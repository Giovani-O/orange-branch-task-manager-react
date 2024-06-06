import { ChangeEvent } from 'react'

interface TextInputProps {
  inputType: 'text' | 'email' | 'password' | 'date'
  placeholder: string
  errorMessage: string
  handleChangeFunction: (event: ChangeEvent<HTMLInputElement>) => void
}

export function TextInput({
  inputType,
  placeholder,
  errorMessage,
  handleChangeFunction,
}: TextInputProps) {
  return (
    <input
      type={inputType}
      placeholder={placeholder}
      className={`px-4 py-2 border-b ${
        errorMessage ? 'border-red-500' : 'border-gray-400'
      } rounded-md w-[480px] max-lg:w-11/12 transition duration-300 ease-in-out focus:border-blue-400 focus:border-b outline-none`}
      onChange={handleChangeFunction}
    />
  )
}
