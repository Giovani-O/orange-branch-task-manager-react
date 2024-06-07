import { ChangeEvent } from 'react'

interface TextInputProps {
  inputType: 'text' | 'email' | 'password' | 'date'
  value: string
  placeholder: string
  useLabel?: boolean
  errorMessage: string
  handleChangeFunction: (event: ChangeEvent<HTMLInputElement>) => void
}

export function TextInput({
  inputType,
  value,
  placeholder,
  useLabel = false,
  errorMessage,
  handleChangeFunction,
}: TextInputProps) {
  function formattedValue() {
    if (inputType === 'date' && value !== '') {
      const dateValue = new Date(value)
      if (!isNaN(dateValue.getTime())) {
        return dateValue.toISOString().split('T')[0]
      } else {
        return new Date().toISOString().split('T')[0]
      }
    }

    return value
  }

  return (
    <div className="flex flex-col">
      {useLabel ? (
        <label htmlFor="input" className="text-xs my-0 py-0">
          {placeholder}
        </label>
      ) : (
        <></>
      )}
      <input
        id="input"
        type={inputType}
        value={formattedValue()}
        placeholder={placeholder}
        className={`px-4 py-2 border-b ${
          errorMessage ? 'border-red-500' : 'border-gray-400'
        } rounded-md w-[480px] max-lg:w-11/12 transition duration-300 ease-in-out focus:border-blue-400 focus:border-b outline-none`}
        onChange={handleChangeFunction}
      />
    </div>
  )
}
