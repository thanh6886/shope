import SildeFilter from './Components/SildeFilter'
import SortAsilde from './Components/SortAsilde'
import Product from './Components/Product'
import { useQuery } from '@tanstack/react-query'
import useQueryParams from 'src/hooks/useQueryParams'
import ProductApi from 'src/apis/product.api'

export default function ProductList() {
  const queryParams = useQueryParams()
  const { data } = useQuery({
    queryKey: ['products', queryParams], // khi queryParams thay đổi thì useQuery sẽ nhận dc như useEffect
    queryFn: () => {
      return ProductApi.getProducts(queryParams)
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
          </div>
        </div>
      </div>
    </div>
  )
}
