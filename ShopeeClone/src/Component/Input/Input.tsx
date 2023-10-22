import { InputHTMLAttributes } from 'react'
import { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
  classNameError?: string
  messenger?: String
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}
export default function Inputs({
  messenger,
  classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
  classNameError = 'mt-1 text-red-500 min-h-[1.5rem] text-sm',
  register,
  name,
  type,
  placeholder,
  className,
  rules
}: Props) {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      <input type={type} placeholder={placeholder} className={classNameInput} {...registerResult} />
      <div className={classNameError}>{messenger}</div>
    </div>
  )
}
