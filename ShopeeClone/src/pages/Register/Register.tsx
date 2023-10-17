import { Link } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Schema, schema } from 'src/Component/Ruler/Ruler'
import Inputs from 'src/Component/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginSchema } from 'src/Component/Ruler/Ruler'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from 'src/apis/auth.api'
import { omit } from 'lodash'
export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<Schema>({
    resolver: yupResolver(schema)
  })
  const registerAccontMutation = useMutation({
    mutationFn: (body: LoginSchema) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['password_Confing'])
    registerAccontMutation.mutate(body, {
      onSuccess: (data) => console.log(data)
    })
  })

  return (
    <div className='bg-orange'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm ' onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng Ký</div>
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
              <Inputs
                type='password'
                placeholder='nhập lại password'
                className='mt-2'
                messenger={errors.password_Confing?.message}
                name='password_Confing'
                register={register}
              />
              <div className='mt-2'>
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
