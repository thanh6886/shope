import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' noValidate>
              <div className='text-2xl'>Đăng nhập</div>
              <input
                name='email'
                type='email'
                placeholder='Email'
                className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
              />
              <div className='mt-1 text-red-500 min-h-[1rem] text-sm'>Email không hợp lệ</div>
              <input
                name='password'
                type='password'
                placeholder='Password'
                className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm'
              />
              <div className='mt-1 text-red-500 min-h-[1rem] text-sm'>Pass không đúng</div>
              <div className='mt-3'>
                <button className='flex  w-full items-center justify-center bg-orange py-4 px-2 text-sm uppercase text-white hover:bg-red-600'>
                  đăng nhập
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
                <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link className='ml-1 text-orange' to='/register'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
