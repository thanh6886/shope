import SildeFilter from './Components/SildeFilter'
import SortAsilde from './Components/SortAsilde'
import Product from './Components/Product'
import { useQuery } from '@tanstack/react-query'
import ProductApi from 'src/apis/product.api'
import Pagination from './Components/Pagination'
import { ProductListConfig, QueryConfig } from 'src/types/product.type'
import useQueryConfig from 'src/Contexts/useQueryConfig'

export default function ProductList() {
  const queryConfig = useQueryConfig()

  const { data } = useQuery({
    queryKey: ['products', queryConfig], // khi queryParams thay đổi thì useQuery sẽ nhận dc như useEffect
    queryFn: () => {
      return ProductApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  return (
    <div className='bg-gray-200  py-6'>
      <div className='container'>
        {data && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <SildeFilter />
            </div>
            <div className='col-span-9'>
              <SortAsilde qureyConfig={queryConfig} pageSize={data.data.data.pagination.page_size} />
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {data.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination qureyConfig={queryConfig} pageSize={data.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
