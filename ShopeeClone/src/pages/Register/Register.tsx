import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { rules } from 'src/Component/Ruler/Ruler'

interface InputData {
  email: string
  password: string
  password_Confing: string
}

export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<InputData>()

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })
  return (
    <div className='bg-orange'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm ' onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng Ký</div>
              <div className='mt-8'>
                <input
                  type='email'
                  placeholder='Email'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  {...register('email', rules.email)}
                />
                <div className='mt-1 text-red-500 min-h-[1.5rem] text-sm'>{errors.email?.message}</div>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  placeholder='Password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm'
                  {...register('password', rules.password)}
                />
                <div className='mt-1 text-red-500 min-h-[1.5rem] text-sm'>{errors.password?.message}</div>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  placeholder='nhập lại Password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm'
                  {...register('password_Confing', rules.password_Confing)}
                />
                <div className='mt-1 text-red-500 min-h-[1.5rem] text-sm'>{errors.password_Confing?.message}</div>
              </div>
              <div className='mt-3'>
                <button
                  className='flex  w-full items-center justify-center bg-orange py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
                  type='submit'
                >
                  đăng ký
                </button>
              </div>

              <div className='text-center mt-2'>
                Bằng việc đăng ký bạn đã đồng ý với Shope về
                <br />
                <a
                  href='https://help.shopee.vn/portal/article/77243'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-red-600 m-2'
                >
                  Điều khoản dịch vụ
                </a>
                &
                <a
                  href='https://help.shopee.vn/portal/article/77244'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-red-600 m-2'
                >
                  Chính sách bảo mật
                </a>
              </div>

              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='ml-1 text-orange' to='/login'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
