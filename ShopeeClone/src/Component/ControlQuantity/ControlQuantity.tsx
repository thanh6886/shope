import Inputs from '../Input'
import InputNumber from '../InputNumber'

export default function ControlQuantity() {
  return (
    <div className=' mt-8 flex items-center'>
      <div className='capitalize text-gray-500'>Số lượng</div>
      <div className='ml-9 flex items-center '>
        <button className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'>
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
          value=''
          className=''
          classNameError='hidden'
          classNameInput='h-8 w-14 border-t border-b border-gray-300 p-1 text-center outline-none'
        />
        <button className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'>
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
