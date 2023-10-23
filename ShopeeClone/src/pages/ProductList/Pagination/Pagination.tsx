import classNames from 'classnames'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  page: number
  setPage: Dispatch<SetStateAction<number>>
  pageSize: number
}

export default function Pagination({ page, setPage, pageSize }: Props) {
  const renderPagination = () => {
    let dotAFTER = false
    let dotBEFORE = false
    const _range = 2

    const setDotBEFFORE = (index: number) => {
      if (!dotBEFORE) {
        dotBEFORE = true
        return (
          <button className='bg-white rounded px-3 py-2 shadow-sm  mx-2 cursor-pointer' key={index}>
            ...
          </button>
        )
      }
      return
    }
    const setDotAFFTER = (index: number) => {
      if (!dotAFTER) {
        dotAFTER = true
        return (
          <button className='bg-white rounded px-3 py-2 shadow-sm  mx-2 cursor-pointer' key={index}>
            ...
          </button>
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
          <button
            className={classNames('bg-white rounded px-3 py-2 shadow-sm  mx-2 cursor-pointer border', {
              'border-red-500': pageIndex === page,
              'border-transparent': pageIndex !== page
            })}
            onClick={() => setPage(pageIndex)}
            key={index}
          >
            {pageIndex}
          </button>
        )
      })
  }

  return (
    <div className='flex flex-wrap mt-6 justify-center'>
      <button className='bg-white rounded px-3 py-2 shadow-sm  mx-2 cursor-pointer'>Prev</button>
      {renderPagination()}
      <button className='bg-white rounded px-3 py-2 shadow-sm  mx-2 cursor-pointer'>Next</button>
    </div>
  )
}
