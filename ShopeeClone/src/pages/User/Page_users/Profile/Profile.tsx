import React from 'react'
import Inputs from 'src/Component/Input'

export default function Profile() {
  return (
    <div className='rounded-sm bg-white md:px-7 px-2 pb-20 shadow'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium  capitalize text-black'>Hồ Sơ Của Tôi</h1>
        <div className='mt-1 text-sm text-gray-700 '>Quản lý thông tin hồ so để bảo mật tài khoản</div>
      </div>
      <div className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
        <form className='mt-6 flex-grow pr-12 md:mt-0'>
          <div className='flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Email</div>
            <div className='w-[80%] pl-5'>
              <div className='pt-3 text-gray-700'>dkmmmmm @gamil.com</div>
            </div>
          </div>
          <div className='mt-6 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Tên</div>
            <div className='w-[80%] pl-5 '>
              <Inputs classNameInput='px-3 py-3 w-full outline-none border border-gray-500 focus:border-gray-500 rounded-sm focus:shadow-sm' />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Số điện thoại</div>
            <div className='w-[80%] pl-5 '>
              <Inputs classNameInput='px-3 py-3 w-full outline-none border border-gray-500 focus:border-gray-500 rounded-sm focus:shadow-sm' />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>địa chỉ</div>
            <div className='w-[80%] pl-5 '>
              <Inputs classNameInput='px-3 py-3 w-full outline-none border border-gray-500 focus:border-gray-500 rounded-sm focus:shadow-sm' />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Ngày sinh</div>
            <div className='w-[80%] pl-5 '>
              <div className='flex justify-between'>
                <select className='h-10 w-[32%] rounded-sm border border-black'>
                  <option disabled>Ngày</option>
                </select>
                <select className='h-10 w-[32%] rounded-sm border border-black'>
                  <option disabled>Tháng</option>
                </select>
                <select className='h-10 w-[32%] rounded-sm border border-black'>
                  <option disabled>Năm</option>
                </select>
              </div>
            </div>
          </div>
        </form>
        <div className='flex mt-6 justify-center md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24 '>
              <img
                src='https://i.pinimg.com/564x/16/e9/74/16e974f2d42cb7dcbd00c47f93fc3e1a.jpg'
                alt=''
                className='h-full w-full rounded-full object-cover'
              />
            </div>
            <input type='file' accept='.jpg,.jpeg,.png' className='hidden' />
            <button className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-md'>
              Chọn ảnh
            </button>
            <div className='mt-3 text-gary-400'>
              <span>Dung lượng file tối đa 1 MB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
