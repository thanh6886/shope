import { Link } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { LoginSchema, login } from 'src/Component/Ruler/Ruler'
import Inputs from 'src/Component/Input'
import { yupResolver } from '@hookform/resolvers/yup'

export default function Login() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<LoginSchema>({
    resolver: yupResolver(login)
  })
  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className='bg-orange'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' noValidate onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng nhập</div>
              <Inputs
                type='email'
                placeholder='email'
                className='mt-6'
                messenger={errors.email?.message}
                name='email'
                register={register}
              />
              <Inputs
                type='password'
                placeholder='password'
                className='mt-2'
                messenger={errors.password?.message}
                name='password'
                register={register}
              />
              <div className='mt-2'>
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
