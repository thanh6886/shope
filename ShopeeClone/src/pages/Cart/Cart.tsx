import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'src/Component/Buttons'
import ControlQuantity from 'src/Component/ControlQuantity'
import { generateNameId } from 'src/Component/Ruler/utils'
import purchaseApi from 'src/apis/purchase.api'
import path from 'src/const/path'
import { purchasesStatus } from 'src/const/purchase'

export default function Cart() {
  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  })
  // console.log(purchasesInCartData?.data.data)
  const purchasesInCart = purchasesInCartData?.data.data

  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
              <div className='col-span-6'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input type='checkbox' className='h-5 w-5 accent-orange' />
                  </div>
                  <div className='flex-grow text-black'>Sản Phẩm</div>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='grid grid-cols-5 text-center'>
                  <div className='col-span-2'>đơn giá</div>
                  <div className='col-span-1'>số lượng</div>
                  <div className='col-span-1'>số tiền</div>
                  <div className='col-span-1'>thao tác</div>
                </div>
              </div>
            </div>
            <div className='my-3 rounded-sm bg-white p-5 shadow'>
              {purchasesInCart?.map((element, index) => (
                <div
                  key={element._id}
                  className='grid grid-cols-12 text-center rounded-sm border border-gray-200 bg-white py-4 px-4 text-sm text-gray-500'
                >
                  <div className='col-span-6'>
                    <div className='flex '>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input type='checkbox' className='h-5 w-5 accent-orange' />
                      </div>
                      <div className='flex-grow'>
                        <div className='flex'>
                          <Link to={`${path.home}${element.product._id}`} className='h-20 w-20 flex-shrink-0'>
                            <img alt={element.product.name} src={element.product.image} />
                          </Link>
                          <div className='flex-grow px-2 pt-1 pb-2'>
                            <Link to={`${path.home}${element.product._id}`} className='line-clamp-2'>
                              {element.product.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 items-center '>
                      <div className='col-span-2'>
                        <div className='flex items-center justify-center '>
                          <span className='text-gray-300 line-through'>
                            ₫{new Intl.NumberFormat().format(element.product.price_before_discount)}
                          </span>
                          <span className='ml-3'>₫{new Intl.NumberFormat().format(element.product.price)}</span>
                        </div>
                      </div>
                      <div className='col-span-1'>
                        <ControlQuantity
                          value={element.buy_count}
                          max={element.product.quantity}
                          // onIncrease={}
                          // onDecrease={}
                          // onType={}
                          // onFocus={}
                        />
                      </div>
                      <div className='col-span-1'>
                        <span className='text-orange'>
                          ₫{new Intl.NumberFormat().format(element.product.price * element.buy_count)}
                        </span>
                      </div>
                      <div className='col-span-1'>
                        <button className='bg-none text-black transition-colors hover:text-orange'>Xóa</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='sticky bottom-0 z-10 flex items-center rounded-sm bg-white p-5 shadow border border-gray-100'>
          <div className='flex flex-shrink-0 items-center  justify-center pr-3'>
            <input type='checkbox' className='h-5 w-5 accent-orange' />
          </div>
          <button className='mx-3 border-none bg-none'>Chọn tất cả</button>
          <button className='mx-3 border-none bg-none'>Xóa</button>
          <div className='ml-5 flex  flex-col  sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
            <div>
              <div className='flex items-center sm:justify-end'>
                <div> TỔNG THANH TOÁN : </div>
                <div className='ml-2 text-2xl text-orange'>1380000</div>
              </div>
              <div className='flex items-center justify-end text-sm sm:justify-end'>
                <div className='text-gray-500'>Tiết kiệm</div>
                <div className='ml-6 text-orange'>123</div>
              </div>
            </div>
            <Button
              type='submit'
              className='mt-5 flex h-10 w-52 ml-4 items-center justify-center bg-red-500  text-sm uppercase text-white hover:bg-red-400 sm:ml-4 sm:mt-0'
            >
              Mua
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
