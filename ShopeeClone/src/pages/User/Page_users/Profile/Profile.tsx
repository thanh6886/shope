import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { profile } from 'console'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Button from 'src/Component/Buttons'
import Inputs from 'src/Component/Input'
import InputNumber from 'src/Component/InputNumber'
import { Schema_User, profileShema, schemaUser } from 'src/Component/Ruler/Ruler'
import useQueryConfig from 'src/Contexts/useQueryConfig'
import UserApi, { BodyUpdate } from 'src/apis/user.api'
import DateSelect from '../../Components/DateSelect'
import { omit } from 'lodash'
import { toast } from 'react-toastify'
import { getUrlAvata, isAxiosErrorUnprocessableEntity, saveUser } from 'src/Component/Ruler/utils'
import { AppContext } from 'src/Contexts/app.Contexts'
import { SuccessResponse } from 'src/types/utils.type'
import { maxSizeUpLoad } from 'src/const/purchase'

type FormData = Pick<Schema_User, 'name' | 'address' | 'phone' | 'avatar' | 'date_of_birth'>
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth: string
}
export default function Profile() {
  const [file, setFile] = useState<File>()
  const previewFile = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])
  const avatarRef = useRef<HTMLInputElement>(null)
  const { setProfile } = useContext(AppContext)
  const { data: ProfileData, refetch } = useQuery({
    queryKey: ['proflie'],
    queryFn: UserApi.getProfile
  })
  const profile = ProfileData?.data.data
  const methods = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver<FormData>(profileShema)
  })
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    setError
  } = methods

  useEffect(() => {
    if (profile) {
      setValue('name', profile.email)
      setValue('address', profile.address),
        setValue('phone', profile.phone),
        setValue('avatar', profile.avatar),
        setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])
  // console.log(profile)
  const uploadProfileMutation = useMutation({
    mutationFn: (body: BodyUpdate) => UserApi.uploadProfile(body)
  })
  const uploadAvata = useMutation({
    mutationFn: UserApi.uploadAvata
  })
  const avatar = watch('avatar')

  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = avatar
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const uploadRes = await uploadAvata.mutateAsync(form)
        avatarName = uploadRes.data.data
        setValue('avatar', avatarName)
      }
      const res = await uploadProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })
      setProfile(res.data.data)
      saveUser(res.data.data)
      // console.log(res.data.data)
    } catch (error) {
      if (isAxiosErrorUnprocessableEntity<SuccessResponse<FormDataError>>(error)) {
        const formError = error.response?.data.data
        console.log(typeof formError)
        for (const key in formError) {
          setError(key as keyof FormDataError, {
            message: formError[key as keyof FormDataError],
            type: 'Server'
          })
        }
      }
    }
  })
  const onFileChane = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileForm = event.target.files?.[0]
    if (fileForm && fileForm?.size >= maxSizeUpLoad) {
      toast.error('file quá dung lượng hoặc không đúng định dạng')
    } else {
      setFile(fileForm)
    }
  }

  const UpAvatar = () => {
    avatarRef.current?.click()
  }

  return (
    <div className='rounded-sm bg-white md:px-7 px-2 pb-20 shadow'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium  capitalize text-black'>Hồ Sơ Của Tôi</h1>
        <div className='mt-1 text-sm text-gray-700 '>Quản lý thông tin hồ so để bảo mật tài khoản</div>
      </div>
      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
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
          <Controller
            control={control}
            name='date_of_birth'
            render={({ field }) => <DateSelect onChange={field.onChange} value={field.value} />}
          />

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
                src={previewFile || getUrlAvata(avatar)}
                alt=''
                className='h-full w-full rounded-full object-cover'
              />
            </div>
            <input
              type='file'
              accept='.jpg,.jpeg,.png'
              className='hidden'
              ref={avatarRef}
              onChange={onFileChane}
              onClick={(event) => ((event.target as any).value = null)}
            />
            <button
              onClick={UpAvatar}
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
