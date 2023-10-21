import path from 'path'
import { Link } from 'react-router-dom'

export default function SildeFilter() {
  return (
    <div className='py-4'>
      <Link to='' className='flex items-center font-bold'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-5 h-5 mr-3 fill-current'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75'
          />
        </svg>
        Tất cả Danh mục
      </Link>
      <div className='bg-gray-500 h-[1px] my-4' />
      <ul>
        <li className='py-2 pl-2'>
          <Link to='' className='relative  text-orange font-semibold'>
            <svg viewBox='0 0 4 7' className='w-2 h-2 fill-orange absolute top-1 left-[-10px]'>
              <polygon points='4 3.5 0 0 0 7'></polygon>
            </svg>
            Thời trang nam
          </Link>
        </li>
        <li className='py-2 pl-2'>
          <Link to='' className='mr-3'>
            áo khoác
          </Link>
        </li>
      </ul>

      <Link to='' className=' font-bold flex items-center uppercase mt-4'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-3 h-4 mr-3 '
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z'
          />
        </svg>
        Bộ LỌC TÌM KIẾM
      </Link>
      <div className='bg-gray-500 h-[2px] my-4' />

      <div className=' my-5'>
        <form className='mt-2'>
          <div className='flex items-start'>
            <input type='text' placeholder='&từ' className='p-1 m-1 text-sm w-full outline-none rounded-sm' />
            <div className='bg-black h-[2px] w-7 mt-4'></div>
            <input type='text' placeholder='&đến' className='p-1 m-1 text-sm w-full outline-none rounded-sm' />
          </div>
          <button className='mt-2 bg-orange w-full h-7 text-white'>ÁP DỤNG</button>
        </form>
      </div>
    </div>
  )
}
