import classNames from 'classnames'
import { Dispatch, SetStateAction } from 'react'
import ProductList from '../../ProductList'
import { QueryConfig } from 'src/types/product.type'
import { Link, createSearchParams } from 'react-router-dom'

interface Props {
  qureyConfig: QueryConfig
  pageSize: number
}

export default function Pagination({ qureyConfig, pageSize }: Props) {
  const _range = 2
  const page = Number(qureyConfig.page)
  const renderPagination = () => {
    let dotAFTER = false
    let dotBEFORE = false
    const setDotBEFFORE = (index: number) => {
      if (!dotBEFORE) {
        dotBEFORE = true
        return (
          <span className='bg-white rounded px-3 py-2 shadow-sm  mx-2 cursor-pointer' key={index}>
            ...
          </span>
        )
      }
      return
    }
    const setDotAFFTER = (index: number) => {
      if (!dotAFTER) {
        dotAFTER = true
        return (
          <span className='bg-white rounded px-3 py-2 shadow-sm  mx-2 cursor-pointer' key={index}>
            ...
          </span>
        )
      }
      return
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageIndex = index + 1
        if (page <= _range * 2 + 1 && pageIndex > page + _range && pageIndex < pageSize - _range + 1) {
          return setDotBEFFORE(index)
        } else if (page >= pageSize - 4 && pageIndex > 2 && pageIndex < page - _range) {
          return setDotAFFTER(index)
        } else if (page >= _range * 2 + 1 && page <= pageSize - _range * 2) {
          if (pageIndex > _range && pageIndex < page - _range) {
            return setDotBEFFORE(index)
          } else if (pageIndex < pageSize - _range + 1 && pageIndex > page + _range) {
            return setDotAFFTER(index)
          }
        }

        return (
          <Link
            to={{
              pathname: '/',
              search: createSearchParams({
                ...qureyConfig,
                page: pageIndex.toString()
              }).toString()
            }}
            className={classNames('bg-white rounded px-3 py-2 shadow-sm  mx-2 cursor-pointer border', {
              'border-red-500': pageIndex === page,
              'border-transparent': pageIndex !== page
            })}
            key={index}
          >
            {pageIndex}
          </Link>
        )
      })
  }

  return (
    <div className='flex flex-wrap mt-6 justify-center'>
      {page === 1 ? (
        <span className='bg-white/60 rounded px-3 py-2 shadow-sm  mx-2 cursor-not-allowed'>Prev</span> // không cho bấm
      ) : (
        <Link
          to={{
            pathname: '/',
            search: createSearchParams({
              ...qureyConfig,
              page: (page - 1).toString()
            }).toString()
          }}
          className='bg-white rounded px-3 py-2 shadow-sm  mx-2 cursor-pointer'
        >
          Prev
        </Link>
      )}
      {renderPagination()}
      {page === pageSize ? (
        <span className='bg-white/60 rounded px-3 py-2 shadow-sm  mx-2 cursor-not-allowed'>Next</span> // không cho bấm
      ) : (
        <Link
          to={{
            pathname: '/',
            search: createSearchParams({
              ...qureyConfig,
              page: (page + 1).toString()
            }).toString()
          }}
          className='bg-white rounded px-3 py-2 shadow-sm  mx-2 cursor-pointer'
        >
          Next
        </Link>
      )}
    </div>
  )
}
