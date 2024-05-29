interface InputErrorProps {
  message: string
}

export function InputErrorMessage({ message }: InputErrorProps) {
  return (
    <span className="text-xs text-red-500 w-[480px] max-lg:w-11/12">
      {message}
    </span>
  )
}
