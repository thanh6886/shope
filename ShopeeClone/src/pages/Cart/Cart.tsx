import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from 'src/Component/Buttons'
import ControlQuantity from 'src/Component/ControlQuantity'
import { generateNameId } from 'src/Component/Ruler/utils'
import purchaseApi from 'src/apis/purchase.api'
import path from 'src/const/path'
import { purchasesStatus } from 'src/const/purchase'
import { Purchase } from 'src/types/purchase.type'
import { produce } from 'immer'
import { keyBy } from 'lodash'
import { toast } from 'react-toastify'
interface ExtendedPurchases extends Purchase {
  disabled: boolean
  checked: boolean
}

export default function Cart() {
  const location = useLocation()
  const choosenPurchaseIdFromLocation = (location.state as { purchaseId: string } | null)?.purchaseId
  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  })
  // console.log(purchasesInCartData?.data.data)
  const purchasesInCart = purchasesInCartData?.data.data

  // updatePurchase
  const updatePurchaseMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => purchaseApi.updatePurchase(body),
    onSuccess: () => {
      refetch()
    }
  })
  // deletePurchase
  const deletePurchaseMutation = useMutation({
    mutationFn: (purchaseIds: string[]) => purchaseApi.deletePurchase(purchaseIds),
    onSuccess: () => {
      refetch() //  ko có gì thay đổi thì hủy gọi api
    }
  })
  // buyPurchase
  const buyPurchaseMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }[]) => purchaseApi.buyProducts(body),
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message, {
        position: 'top-center',
        autoClose: 1000
      })
    }
  })

  // checkall

  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchases[]>([])
  const isAllcheck = useMemo(() => extendedPurchases.every((e) => e.checked), [extendedPurchases])
  const checkPurchase = useMemo(() => extendedPurchases.filter((element) => element.checked), [extendedPurchases])
  // console.log(checkPurchase)
  const purchasesPrice = useMemo(
    () =>
      checkPurchase.reduce((res, current) => {
        return res + current.product.price * current.buy_count
      }, 0),
    [checkPurchase]
  )
  const purchasesPrice_before_discount = useMemo(
    () =>
      checkPurchase.reduce((res, current) => {
        return res + current.product.price_before_discount * current.buy_count
      }, 0),
    [checkPurchase]
  )

  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchasesObject = keyBy(prev, '_id')

      return (
        purchasesInCart?.map((purchase) => {
          const isChoosenPurchaseFromLocation = choosenPurchaseIdFromLocation === purchase._id
          return {
            ...purchase,
            disabled: false,
            checked: isChoosenPurchaseFromLocation || Boolean(extendedPurchasesObject[purchase._id]?.checked)
          }
        }) || []
      )
    })
  }, [purchasesInCart, choosenPurchaseIdFromLocation])
  // console.log(extendedPurchases)

  const handleCheck = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[index].checked = event.target.checked
      })
    )
  }
  const handleCheckAll = () => {
    setExtendedPurchases((prev) => {
      // console.log(prev)
      return prev.map((element) => ({
        ...element,
        checked: !isAllcheck
      }))
    })
  }
  // input Quantity Control
  const handleTypeQuantity = (index: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[index].buy_count = value
      })
    )
  }
  const handleQuantity = (index: number, value: number, check: boolean) => {
    const purchase = extendedPurchases[index]
    if (check) {
      setExtendedPurchases(
        produce((draft) => {
          draft[index].disabled = true
        })
      )

      updatePurchaseMutation.mutate({
        product_id: purchase.product._id,
        buy_count: value
      })
    }
  }
  // delete
  const handleDelete = (index: number) => {
    const purchaseId = extendedPurchases[index]._id
    deletePurchaseMutation.mutate([purchaseId])
  }
  const handleDeleteAll = () => {
    const purchaseIdAll = checkPurchase.map((element) => {
      return element._id
    })
    deletePurchaseMutation.mutate(purchaseIdAll)
  }
  // buy
  const handleBuy = () => {
    if (checkPurchase.length > 0) {
      const productALL = checkPurchase.map((element) => ({
        product_id: element.product._id,
        buy_count: element.buy_count
      }))
      //  console.log(productALL)
      buyPurchaseMutation.mutate(productALL)
    }
  }

  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
              <div className='col-span-6'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input
                      type='checkbox'
                      className='h-5 w-5 accent-orange'
                      checked={isAllcheck}
                      onChange={handleCheckAll}
                    />
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
              {extendedPurchases?.map((element, index) => (
                <div
                  key={element._id}
                  className='grid grid-cols-12 text-center items-center rounded-sm border border-gray-200 bg-white py-4 px-4 text-sm text-gray-500'
                >
                  <div className='col-span-6'>
                    <div className='flex '>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          className='h-5 w-5 accent-orange'
                          checked={element.checked}
                          onChange={handleCheck(index)}
                        />
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
                          classNameWrapper='flex items-center'
                          onIncrease={(value) => handleQuantity(index, value, value <= element.product.quantity)}
                          onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                          disabled={element.disabled}
                          onType={handleTypeQuantity(index)}
                          onFocusOut={(value) =>
                            handleQuantity(
                              index,
                              value,
                              value <= element.product.quantity &&
                                value >= 1 &&
                                value !== (purchasesInCart as Purchase[])[index].buy_count
                            )
                          }
                        />
                      </div>
                      <div className='col-span-1'>
                        <span className='text-orange'>
                          ₫{new Intl.NumberFormat().format(element.product.price * element.buy_count)}
                        </span>
                      </div>
                      <div className='col-span-1'>
                        <button
                          className='bg-none text-black transition-colors hover:text-orange'
                          onClick={() => handleDelete(index)}
                        >
                          Xóa
                        </button>
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
            <input type='checkbox' className='h-5 w-5 accent-orange' checked={isAllcheck} onChange={handleCheckAll} />
          </div>
          <button className='mx-3 border-none bg-none' onClick={handleCheckAll}>
            Chọn tất cả({extendedPurchases.length})
          </button>
          <button className='mx-3 border-none bg-none' onClick={handleDeleteAll}>
            Xóa
          </button>
          <div className='ml-5 flex  flex-col  sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
            <div>
              <div className='flex items-center sm:justify-end'>
                <div> TỔNG THANH TOÁN : </div>
                <div className='ml-2 text-2xl text-orange'> ₫{new Intl.NumberFormat().format(purchasesPrice)}</div>
              </div>
              <div className='flex items-center justify-end text-sm sm:justify-end'>
                <div className='text-gray-500'>Tiết kiệm</div>
                <div className='ml-6 text-orange'>
                  ₫{new Intl.NumberFormat().format(purchasesPrice_before_discount - purchasesPrice)}
                </div>
              </div>
            </div>
            <Button
              type='submit'
              className='mt-5 flex h-10 w-52 ml-4 items-center justify-center bg-red-500  text-sm uppercase text-white hover:bg-red-400 sm:ml-4 sm:mt-0'
              onClick={handleBuy}
            >
              Mua
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
