import React from 'react'
import { Helmet } from 'react-helmet-async'
import Product from '../ProductList/Components/Product'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import ProductApi from 'src/apis/product.api'
import ProductRating from '../ProductList/Components/ProductRating'
import { rateSale } from 'src/Component/Ruler/utils'

export default function ProductItem() {
  const { id } = useParams()
  const { data: productDetailData } = useQuery({
    // productDetailData không phải định nghĩ kiểu dũ liệu mà là gán truy vấn
    queryKey: ['product', id],
    queryFn: () => ProductApi.getProductDetail(id as string)
  })
  const product = productDetailData?.data.data
  if (!product) return null
  console.log(product)
  return (
    <div className='bg-gray-200 py-6'>
      <div className='bg-white p-4 shadow'>
        <div className='container'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div className='relative w-full pt-[100%] shadow'>
                <img
                  src={product.image}
                  alt={product.name}
                  className='absolute top-0 left-0 bg-white w-full h-full object-cover'
                />
              </div>
              <div className='relative shadow mt-4 grid grid-cols-5 gap-1'>
                <button className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-4 h-4 text-black'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                </button>

                {product.images.slice(0, 5).map((img, index) => {
                  const isActive = index === 0
                  return (
                    <div className='relative w-full pt-[100%]'>
                      <img
                        src={product.image}
                        alt={product.name}
                        className='absolute top-0 left-0 cursor-pointer bg-white w-full h-full object-cover'
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-orange'></div>}
                    </div>
                  )
                })}
                <button className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-4 h-4 text-black'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
              <div className='mt-8 flex items-center'>
                <div className='flex items-center'>
                  <span className=' mr-1 border-b border-b-orange text-orange'>{product.rating}</span>
                  <ProductRating
                    rating={product.rating}
                    activeClassName='fill-orange h-4 w-4'
                    notActiveClassName='fill-gray-300 text-gray-300 h-4 w-4'
                  />
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-400'></div>
                <div>
                  <span className=''>
                    {new Intl.NumberFormat('en', {
                      notation: 'compact',
                      maximumFractionDigits: 2
                    })
                      .format(product.sold)
                      .replace('.', ',')
                      .toLowerCase()}{' '}
                    Đã bán
                  </span>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>
                  ₫{new Intl.NumberFormat().format(product.price_before_discount)}
                </div>
                <div className='text-3xl ml-3 font-medium text-orange'>
                  ₫{new Intl.NumberFormat().format(product.price)}
                </div>
                <div className='ml-4 rounded-sm bg-orange px-1 py-[2px] text-sm font-semibold uppercase text-white'>
                  {rateSale(product.price_before_discount, product.price)}giảm
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}