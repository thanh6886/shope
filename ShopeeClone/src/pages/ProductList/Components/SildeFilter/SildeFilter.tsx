import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { omit } from 'lodash'
import { Controller, useForm } from 'react-hook-form'

import { Link, NavLink, createSearchParams, useNavigate } from 'react-router-dom'
import Button from 'src/Component/Buttons'
import Inputs from 'src/Component/Input'
import InputNumber from 'src/Component/InputNumber'
import { Schema, priceSchema } from 'src/Component/Ruler/Ruler'
import path from 'src/const/path'
import { Category } from 'src/types/category.type'
import { QueryConfig } from 'src/types/product.type'
import { NoUndefinedField } from 'src/types/utils.type'
import { ObjectSchema } from 'yup'
import RatingStart from '../RatingStart'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}
type FormData = NoUndefinedField<Pick<Schema, 'price_max' | 'price_min'>>
// type FormData = {
//   price_max: string
//   price_min: string
// }

export default function SildeFilter({ queryConfig, categories }: Props) {
  const navigate = useNavigate()
  const { category } = queryConfig
  // console.log(queryConfig)
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    trigger
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver<FormData>(priceSchema as ObjectSchema<FormData>)
  })
  const _onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        price_max: data.price_max,
        price_min: data.price_min
      }).toString()
    })
  })
  const handleRemoveAll = () => {
    reset()
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category'])).toString()
    })
  }
  return (
    <div className='py-4'>
      <Link
        to=''
        className={classNames('flex items-center font-bold', {
          'text-orange': !category
        })}
      >
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
        {categories.map((element, index) => {
          const isActive = category == element._id
          return (
            <li className='py-2 pl-2' key={index}>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: element._id
                  }).toString()
                }}
                className={classNames('relative px-2', {
                  'text-orange font-semibold': isActive
                })}
              >
                {isActive && (
                  <svg viewBox='0 0 4 7' className='w-2 h-2 fill-orange absolute top-1 left-[-10px]'>
                    <polygon points='4 3.5 0 0 0 7'></polygon>
                  </svg>
                )}

                {element.name}
              </Link>
            </li>
          )
        })}
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
        <form className='mt-2' onSubmit={_onSubmit}>
          <div className='flex items-start'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    placeholder='₫ TỪ'
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    classNameError='hidder'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_min')
                    }}
                  />
                )
              }}
            />
            <div className='mx-2 mt-1 shrink-0'>--</div>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    placeholder='₫ Đến'
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    classNameError='hidder'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_max')
                    }}
                  />
                )
              }}
            />
          </div>
          <Button className=' bg-orange uppercase w-full h-[32px] text-sm text-white hover:bg-red-600 flex justify-center items-center mt-2'>
            ÁP DỤNG
          </Button>
        </form>
      </div>
      <div className='bg-gray-500 h-[2px] my-4' />
      <div className='text-sm'>Đánh giá</div>
      <RatingStart queryConfig={queryConfig} />
      <div className='bg-gray-500 h-[2px] my-4' />
      <Button
        className=' bg-orange uppercase w-full h-[32px] text-sm text-white hover:bg-red-600 flex justify-center items-center'
        onClick={handleRemoveAll}
      >
        Xoá Tất Cả
      </Button>
    </div>
  )
}
