import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'

import React from 'react'
import { Link, createSearchParams } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import path from 'src/const/path'
import { purchasesStatus } from 'src/const/purchase'
import useQueryParams from 'src/hooks/useQueryParams'
import { QueryConfig } from 'src/types/product.type'
import { PurchaseListStatus } from 'src/types/purchase.type'

export default function History_user() {
  const queryParams: { status?: string } = useQueryParams()
  const status: number = Number(queryParams.status) || purchasesStatus.all
  const { data: purchasesData, refetch } = useQuery({
    queryKey: ['purchases', { status }],
    queryFn: () => purchaseApi.getPurchases({ status: status as PurchaseListStatus })
  })
  const purchases = purchasesData?.data.data

  const PurchaseTabs = [
    {
      status: purchasesStatus.all,
      name: 'Tất Cả'
    },
    {
      status: purchasesStatus.waitForConfirmation,
      name: 'Chờ Xác Nhận'
    },
    {
      status: purchasesStatus.waitForGetting,
      name: 'Chờ Lấy Hàng'
    },
    {
      status: purchasesStatus.inProgress,
      name: 'Đang Giao'
    },
    {
      status: purchasesStatus.delivered,
      name: 'Đã Giao'
    },
    {
      status: purchasesStatus.cancelled,
      name: 'Đã Hủy'
    }
  ]
  const PurchaseTabsLink = PurchaseTabs.map((e) => {
    return (
      <Link
        key={e.status}
        to={{
          pathname: path.historyPurchase,
          search: createSearchParams({
            status: String(e.status)
          }).toString()
        }}
        className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
          'border-b-orange text-orange': status === e.status,
          'border-b-black/10 text-gray-900': status !== e.status
        })}
      >
        {e.name}
      </Link>
    )
  })
  return (
    <div>
      <div className='sticky top-0 rounded-t-sm shadow-sm flex '>{PurchaseTabsLink}</div>
      <div>
        {purchases?.map((element) => {
          return (
            <div key={element._id} className='mt-4 rounded-sm border-black bg-white p-6 text-gray-900 shadow-sm'>
              <Link to={`${path.home}${element._id}`} className='flex'>
                <div className='flex-shrink-0'>
                  <img className='h-20 w-20 object-cover' src={element.product.image} alt={element.product.name} />
                </div>
                <div className='ml-3 flex-grow overflow-hidden'>
                  <div className='truncate'>{element.product.name}</div>
                  <div className='mt-3'>x{element.buy_count}</div>
                </div>
                <div className='ml-3 flex-shrink-0'>
                  <span className='truncate text-gray-500 line-through'>
                    {new Intl.NumberFormat().format(element.price_before_discount)}
                  </span>
                  <span className='ml-2 truncate text-orange'>₫{new Intl.NumberFormat().format(element.price)}</span>
                </div>
              </Link>
              <div className='flex justify-end'>
                <div>
                  <span>Tổng giá tiền</span>
                  <span className='ml-4 text-xl text-orange'>
                    {new Intl.NumberFormat().format(element.product.price * element.buy_count)}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
