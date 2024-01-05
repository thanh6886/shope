import { InputHTMLAttributes, forwardRef, useState } from 'react'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
  classNameError?: string
  errorMessenger?: String
}
const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
  {
    errorMessenger,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    classNameError = 'mt-1 text-red-500 min-h-[1.5rem] text-sm',
    className,
    onChange,
    value,
    ...rest
  },
  ref
) {
  const [localValue, setLocalValue] = useState<string>(value as string)

  const handleChange = (element: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = element.target
    // console.log(value)
    if (/^\d+$/.test(value) || value === '') {
      // Thực thi onChange callback từ bên ngoài truyền vào props
      onChange && onChange(element)
      // Cập nhật localValue state
      setLocalValue(value)
    }
  }
  return (
    <div className={className}>
      <input
        className={classNameInput}
        {...rest}
        onChange={handleChange}
        value={value === undefined ? localValue : value}
        ref={ref}
      />
      <div className={classNameError}>{errorMessenger}</div>
    </div>
  )
})

export default InputNumber
