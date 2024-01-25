import { use } from 'i18next'
import { InputHTMLAttributes, useState } from 'react'
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
  className,
  rules,
  ...rest
}: Props) {
  const [viewPass, setViewPass] = useState(false)
  const registerResult = register && name ? register(name, rules) : {}
  const handleType = () => {
    if ((rest.type = 'password')) {
      return viewPass ? 'text' : 'password'
    }
    return rest.type
  }
  return (
    <div className={className}>
      <input className={classNameInput} {...registerResult} {...rest} />
      <div className={classNameError}>{messenger}</div>
    </div>
  )
}
