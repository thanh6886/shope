import { rest } from 'lodash'
import Inputs from '../Input'
import InputNumber, { InputNumberProps } from '../InputNumber'
import { useState } from 'react'

interface Props extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
  onFocusOut?: (value: number) => void
  classNameWrapper?: string
}

export default function ControlQuantity({
  max,
  onIncrease,
  onDecrease,
  onType,
  onFocusOut,
  classNameWrapper = 'ml-10',
  value,
  ...rest
}: Props) {
  const [localValue, setLocalValue] = useState<Number>(Number(value || 0))

  const handleChange = (element: React.ChangeEvent<HTMLInputElement>) => {
    // const {value} = element.target
    let _value = Number(element.target.value)

    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }
    onType && onType(_value)
  }

  const Increase = () => {
    let _value = Number(value || localValue) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }
    setLocalValue(_value)
    onIncrease && onIncrease(_value)
  }
  const Decrease = () => {
    let _value = Number(value || localValue) - 1
    if (_value < 1) {
      _value = 1
    }
    onDecrease && onDecrease(_value)
    setLocalValue(_value)
  }

  return (
    <div className='mt-8 flex items-center'>
      <div className='capitalize text-gray-500'>Số lượng</div>
      <div className='ml-9 flex items-center '>
        <button
          className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'
          onClick={Decrease}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-4 h-4'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M18 12H6' />
          </svg>
        </button>
        <InputNumber
          value={value}
          onChange={handleChange}
          className=''
          classNameError='hidden'
          classNameInput='h-8 w-14 border-t border-b border-gray-300 p-1 text-center outline-none'
          {...rest}
        />
        <button
          className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'
          onClick={Increase}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-4 h-4'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v12m6-6H6' />
          </svg>
        </button>
      </div>

      <div className='ml-6 text-sm text-gray-500'> sản phẩm có sẵn</div>
    </div>
  )
}
