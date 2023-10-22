import SildeFilter from './Components/SildeFilter'
import SortAsilde from './Components/SortAsilde'
import Product from './Components/Product'
import { useQuery } from '@tanstack/react-query'

export default function ProductList() {
  // const {data} = useQuery({
  //   queryKey; ['products', queryParams],

  // })
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
              {Array(30)
                .fill(0)
                .map((_, index) => (
                  <div className='col-span-1' key={index}>
                    <Product />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
