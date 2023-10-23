import SildeFilter from './Components/SildeFilter'
import SortAsilde from './Components/SortAsilde'
import Product from './Components/Product'
import { useQuery } from '@tanstack/react-query'
import useQueryParams from 'src/hooks/useQueryParams'
import ProductApi from 'src/apis/product.api'
import Pagination from './Pagination'
import { useState } from 'react'
import { ProductListConfig, QueryConfig } from 'src/types/product.type'
import { isUndefined, omitBy } from 'lodash'

export default function ProductList() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit,
      sort_by: queryParams.sort_by,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      category: queryParams.category,
      exclude: queryParams.exclude
    },
    isUndefined
  )

  const { data } = useQuery({
    queryKey: ['products', queryConfig], // khi queryParams thay đổi thì useQuery sẽ nhận dc như useEffect
    queryFn: () => {
      return ProductApi.getProducts(queryConfig as ProductListConfig)
    }
  })
  console.log(data)
  return (
    <div className='bg-gray-200  py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <SildeFilter />
          </div>
          <div className='col-span-9'>
            <SortAsilde />
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {data &&
                data.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
            </div>
            <Pagination page={1} setPage={() => {}} pageSize={20} />
          </div>
        </div>
      </div>
    </div>
  )
}
