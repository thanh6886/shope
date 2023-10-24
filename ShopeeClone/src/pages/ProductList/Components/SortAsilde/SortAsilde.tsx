import { ProductListConfig, QueryConfig } from 'src/types/product.type'
import { order as orderPrice, sortBy } from 'src/const/product'
import classNames from 'classnames'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { omit } from 'lodash'
import { number } from 'prop-types'

interface Props {
  qureyConfig: QueryConfig
  pageSize: number
}

export default function SortAsilde({ qureyConfig, pageSize }: Props) {
  const { sort_by = sortBy.createdAt, order } = qureyConfig
  const page = Number(qureyConfig.page)
  const navigate = useNavigate()
  const isActiveSort = (sortValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortValue
  }

  const hanldeSort = (sortValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: '/',
      search: createSearchParams(
        omit(
          {
            ...qureyConfig,
            sort_by: sortValue
          },
          ['order']
        )
      ).toString()
    })
  }
  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: '/',
      search: createSearchParams({
        ...qureyConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }
  return (
    <div className='bg-gray-400/40 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex items-center flex-wrap gap-2'>
          <div>Sắp xếp theo</div>
          <button
            className={classNames('text-center h-8 px-4 capitalizes text-sm', {
              'bg-orange text-white hover:bg-orange/80': isActiveSort(sortBy.view),
              'bg-white text-black hover:bg-slate-100': !isActiveSort(sortBy.view)
            })}
            onClick={() => hanldeSort(sortBy.view)}
          >
            Phổ biến
          </button>
          <button
            className={classNames('text-center h-8 px-4 capitalizes text-sm', {
              'bg-orange text-white hover:bg-orange/80': isActiveSort(sortBy.createdAt),
              'bg-white text-black hover:bg-slate-100': !isActiveSort(sortBy.createdAt)
            })}
            onClick={() => hanldeSort(sortBy.createdAt)}
          >
            Mới nhất
          </button>
          <button
            className={classNames('text-center h-8 px-4 capitalizes text-sm', {
              'bg-orange text-white hover:bg-orange/80': isActiveSort(sortBy.sold),
              'bg-white text-black hover:bg-slate-100': !isActiveSort(sortBy.sold)
            })}
            onClick={() => hanldeSort(sortBy.sold)}
          >
            Bán chạy
          </button>
          <select
            className={classNames(
              'h-8 px-4 text-left outline-none capitalize',
              { 'bg-white text-orange hover:text-orange': isActiveSort(sortBy.price) },
              { 'bg-white text-black hover:bg-slate-100': !isActiveSort(sortBy.price) }
            )}
            value={order || ''}
            onChange={(event) => handlePriceOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)}
          >
            <option value='' disabled className='bg-white text-black'>
              Giá
            </option>
            <option value={orderPrice.asc}>Giá: Thấp đến cao</option>
            <option value={orderPrice.desc}>Giá: Cao đến thấp</option>
          </select>
        </div>
        <div className='flex item-center'>
          <div>
            <span className='text-orange'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='ml-2 flex'>
            {page === 1 ? (
              <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-tl-sm rounded-bl-sm bg-white/60  shadow hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: '/',
                  search: createSearchParams({
                    ...qureyConfig,
                    page: (page - 1).toString()
                  }).toString()
                }}
                className='flex h-8 w-9  items-center justify-center rounded-tl-sm rounded-bl-sm bg-white  shadow hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </Link>
            )}
            {page === pageSize ? (
              <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-tl-sm rounded-bl-sm bg-white/60  shadow hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: '/',
                  search: createSearchParams({
                    ...qureyConfig,
                    page: (page + 1).toString()
                  }).toString()
                }}
                className='flex h-8 w-9  items-center justify-center rounded-tl-sm rounded-bl-sm bg-white  shadow hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
