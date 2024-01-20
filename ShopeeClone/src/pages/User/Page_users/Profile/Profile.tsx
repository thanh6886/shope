import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery } from '@tanstack/react-query'
import { profile } from 'console'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Button from 'src/Component/Buttons'
import Inputs from 'src/Component/Input'
import InputNumber from 'src/Component/InputNumber'
import { SchemaUser, schemaUser, profileShema } from 'src/Component/Ruler/Ruler'
import useQueryConfig from 'src/Contexts/useQueryConfig'
import UserApi from 'src/apis/user.api'

type FormData = Pick<SchemaUser, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>

export default function Profile() {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    setError,
    watch
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileShema)
  })
  const { data: ProfileData } = useQuery({
    queryKey: ['proflie'],
    queryFn: UserApi.getProfile
  })
  console.log(ProfileData)
  useEffect(() => {
    if (ProfileData?.data.data) {
      setValue('name', ProfileData.data.data.name),
        setValue('address', ProfileData.data.data.address),
        setValue('phone', ProfileData.data.data.phone),
        setValue('avatar', ProfileData.data.data.avatar),
        setValue(
          'date_of_birth',
          ProfileData.data.data.date_of_birth ? new Date(ProfileData.data.data.date_of_birth) : new Date(1990, 0, 1)
        )
    }
  }, [ProfileData?.data.data, setValue])
  return (
    <div className='rounded-sm bg-white md:px-7 px-2 pb-20 shadow'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium  capitalize text-black'>Hồ Sơ Của Tôi</h1>
        <div className='mt-1 text-sm text-gray-700 '>Quản lý thông tin hồ so để bảo mật tài khoản</div>
      </div>
      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
        <div className='mt-6 flex-grow pr-12 md:mt-0'>
          <div className='flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Email</div>
            <div className='w-[80%] pl-5'>
              <div className='pt-3 text-gray-700'>{ProfileData?.data.data.email}</div>
            </div>
          </div>
          <div className='mt-6 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Tên</div>
            <div className='w-[80%] pl-5 '>
              <Inputs
                classNameInput='px-3 py-3 w-full outline-none border border-gray-500 focus:border-gray-500 rounded-sm focus:shadow-sm'
                register={register}
                name='name'
                placeholder='tên'
                messenger={errors.name?.message}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Số điện thoại</div>
            <div className='w-[80%] pl-5 '>
              <Controller
                control={control}
                name='phone'
                render={({ field }) => (
                  <InputNumber
                    classNameInput='px-3 py-3 w-full outline-none border border-gray-500 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    placeholder='số điện thoại'
                    errorMessenger={errors.phone?.message}
                    {...field}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>địa chỉ</div>
            <div className='w-[80%] pl-5 '>
              <Inputs
                classNameInput='px-3 py-3 w-full outline-none border border-gray-500 focus:border-gray-500 rounded-sm focus:shadow-sm'
                register={register}
                name='address'
                placeholder='địa chỉ'
                messenger={errors.address?.message}
              />
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
          <div className='mt-5 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'></div>
            <div className='w-[80%] pl-5 flex justify-center'>
              <Button
                className='flex items-center h-9 bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
                type='submit'
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
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
            <button
              className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-md'
              type='button'
            >
              Chọn ảnh
            </button>
            <div className='mt-3 text-gary-400'>
              <span>Dung lượng file tối đa 1 MB</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
