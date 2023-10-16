import { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface Props {
  type: React.HTMLInputTypeAttribute
  placeholder?: string | undefined
  className?: string | undefined
  messenger?: String
  register: UseFormRegister<any>
  // rules?: RegisterOptions
  name: string
}
export default function Inputs({ type, placeholder, messenger, className, register, name }: Props) {
  return (
    <div className={className}>
      <input
        type={type}
        placeholder={placeholder}
        className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
        {...register(name)}
      />
      <div className='mt-1 text-red-500 min-h-[1.5rem] text-sm'>{messenger}</div>
    </div>
  )
}
