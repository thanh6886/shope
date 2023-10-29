import React from 'react'
import { Link } from 'react-router-dom'
import { Product as ProductType } from 'src/types/product.type'
import ProductRating from '../ProductRating'
import path from 'src/const/path'

interface Props {
  product: ProductType
}

export default function Product({ product }: Props) {
  return (
    <Link to={`${path.home}${product._id}`}>
      <div className='bg-white shadow rounded-sm hover:translate-y-[-0.04rem] hover:shadow-sm  duration-100 transition-transform overflow-hidden'>
        <div className='w-full pt-[100%] relative'>
          <img
            src={product.image}
            alt={product.name}
            className='absolute top-0 left-0 bg-white w-full h-full object-cover'
          />
        </div>
        <div className='p-2 overflow-hidden'>
          <div className='min-h-[2rem] line-clamp-2 text-xs'>{product.name}</div>
          <div className='flex items-center mt-3'>
            <div className='line-through max-w-[50%] text-gray-500 truncate'>
              <span className='text-xs'>₫</span>
              <span className=''>{new Intl.NumberFormat().format(product.price_before_discount)}</span>
            </div>
            <div className='text-orange max-w-[50%] ml-1'>
              <span className='text-xs'>₫</span>
              <span className=''>{new Intl.NumberFormat().format(product.price)}</span>
            </div>
          </div>

          <div className='mt-3 flex items-center justify-start'>
            <ProductRating rating={product.rating} />
            <div className='ml-2 text-sm '>
              <span>
                {new Intl.NumberFormat('en', {
                  notation: 'compact',
                  maximumFractionDigits: 2
                })
                  .format(product.sold)
                  .replace('.', ',')
                  .toLowerCase()}
              </span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
