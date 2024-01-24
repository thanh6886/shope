import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { NonUndefined, useForm } from 'react-hook-form'
import Button from 'src/Component/Buttons/Button'
import Inputs from 'src/Component/Input'
import { NoUndefinedField, SuccessResponse } from 'src/types/utils.type'
import { Schema_User, newPasswordSchema } from 'src/Component/Ruler/Ruler'
import { ObjectSchema } from 'yup'
import { useMutation } from '@tanstack/react-query'
import UserApi from 'src/apis/user.api'
import { omit } from 'lodash'
import { toast } from 'react-toastify'
import { isAxiosErrorUnprocessableEntity } from 'src/Component/Ruler/utils'

type FormData = NoUndefinedField<Pick<Schema_User, 'password' | 'new_password' | 'password_Confing'>>

export default function ChangePassword() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      password_Confing: '',
      new_password: ''
    },
    resolver: yupResolver<FormData>(newPasswordSchema as ObjectSchema<FormData>)
  })
  const UpdatePassWordMution = useMutation(UserApi.uploadProfile)
  const onSubmit = handleSubmit((data) => {
    try {
      console.log(data)
      const body = omit(data, ['password_Confing'])
      UpdatePassWordMution.mutate(body, {
        onSuccess: (_data) => {
          toast.success(_data.data.message)
          reset()
        }
      })
    } catch (error) {
      if (isAxiosErrorUnprocessableEntity<SuccessResponse<FormData>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              // message: formError[key as keyof FormData],
              type: 'Server'
            })
          })
        }
      }
    }
  })
  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Đổi mật khẩu</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <form className='mt-8 mr-auto max-w-2xl' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Mật khẩu cũ</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Inputs
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                className='relative '
                register={register}
                name='password'
                type='password'
                placeholder='Mật khẩu cũ'
                messenger={errors.password?.message}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Mật khẩu mới</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Inputs
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                className='relative '
                register={register}
                name='new_password'
                type='password'
                placeholder='Mật khẩu mới'
                messenger={errors.new_password?.message}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Nhập lại mật khẩu</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Inputs
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                className='relative '
                register={register}
                name='password_Confing'
                type='password'
                placeholder='Nhập lại mật khẩu'
                messenger={errors.password_Confing?.message}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
            <div className='flex sm:w-[80%] sm:pl-5 justify-center'>
              <Button
                className='flex h-9 items-center rounded-sm bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
                type='submit'
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
function isAxiosUnprocessableEntityError<T>(error: unknown) {
  throw new Error('Function not implemented.')
}
