import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
  classNameError?: string
  messenger?: String
}
export default function InputNumber({
  messenger,
  classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
  classNameError = 'mt-1 text-red-500 min-h-[1.5rem] text-sm',
  className,
  onChange,
  ...rest
}: Props) {
  const handleChange = (element: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = element.target
    console.log(value)
  }
  return (
    <div className={className}>
      <input className={classNameInput} {...rest} onChange={handleChange} />
      <div className={classNameError}>{messenger}</div>
    </div>
  )
}
